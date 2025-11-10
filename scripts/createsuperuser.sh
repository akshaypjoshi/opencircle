#!/bin/bash

# Create Superuser Script for OpenCircle
# This script prompts for user details and creates a superuser in the database

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/../apps/api"

# Check if API directory exists
if [ ! -d "$API_DIR" ]; then
    echo -e "${RED}Error: API directory not found at $API_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}=== OpenCircle Superuser Creation ===${NC}"
echo

# Prompt for user details
echo -e "${YELLOW}Please enter the following details:${NC}"

read -p "Name: " NAME
read -p "Email: " EMAIL
read -p "Username: " USERNAME
read -s -p "Password: " PASSWORD
echo
read -s -p "Confirm Password: " PASSWORD_CONFIRM
echo

# Validate inputs
if [ -z "$NAME" ] || [ -z "$EMAIL" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
    echo -e "${RED}Error: All fields are required${NC}"
    exit 1
fi

if [ "$PASSWORD" != "$PASSWORD_CONFIRM" ]; then
    echo -e "${RED}Error: Passwords do not match${NC}"
    exit 1
fi

if [ ${#PASSWORD} -lt 8 ]; then
    echo -e "${RED}Error: Password must be at least 8 characters long${NC}"
    exit 1
fi

echo
echo -e "${YELLOW}Creating superuser with the following details:${NC}"
echo "Name: $NAME"
echo "Email: $EMAIL"
echo "Username: $USERNAME"
echo

read -p "Continue? (y/N): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Operation cancelled${NC}"
    exit 0
fi

# Change to API directory
cd "$API_DIR"

# Create Python script to create superuser
PYTHON_SCRIPT=$(cat <<EOF
import sys
sys.path.append('.')

from sqlmodel import Session
from src.database.engine import engine
from src.database.models import User, UserSettings, Role
from src.modules.auth.auth_methods import hash_password

def create_superuser():
    """Create a superuser in the database."""
    
    # Check if user already exists
    with Session(engine) as db:
        # Check for existing username
        from sqlmodel import select
        from src.database.models import User
        
        existing_user = db.exec(select(User).where(User.username == "$USERNAME")).first()
        
        if existing_user:
            print(f"❌ User with username '$USERNAME' already exists")
            return False
        
        # Check for existing email
        existing_email = db.exec(select(User).where(User.email == "$EMAIL")).first()
        
        if existing_email:
            print(f"❌ User with email '$EMAIL' already exists")
            return False
        
        # Hash the password
        hashed_password = hash_password("$PASSWORD")
        
        # Create the superuser
        superuser = User(
            name="$NAME",
            email="$EMAIL",
            username="$USERNAME",
            password=hashed_password,
            role=Role.ADMIN,
            is_active=True,
            is_verified=True
        )
        
        # Add user to database
        db.add(superuser)
        db.commit()
        db.refresh(superuser)
        
        # Create user settings
        user_settings = UserSettings(
            user_id=superuser.id,
            is_onboarded=True
        )
        db.add(user_settings)
        db.commit()
        
        print(f"✅ Superuser created successfully!")
        print(f"   ID: {superuser.id}")
        print(f"   Username: {superuser.username}")
        print(f"   Email: {superuser.email}")
        print(f"   Role: {superuser.role}")
        
        return True

if __name__ == "__main__":
    try:
        success = create_superuser()
        if not success:
            sys.exit(1)
    except Exception as e:
        print(f"❌ Error creating superuser: {e}")
        sys.exit(1)
EOF
)

# Run the Python script
echo -e "${BLUE}Creating superuser...${NC}"
if uv run python -c "$PYTHON_SCRIPT"; then
    echo
    echo -e "${GREEN}✅ Superuser created successfully!${NC}"
    echo -e "${GREEN}You can now login with the username '$USERNAME' and your password.${NC}"
else
    echo
    echo -e "${RED}❌ Failed to create superuser${NC}"
    exit 1
fi