from typing import Optional

from sqlmodel import Session, select

from src.database.models import Reaction


def create_reaction(db: Session, reaction_data: dict) -> Optional[Reaction]:
    """Create or toggle a reaction."""
    user_id = reaction_data["user_id"]
    post_id = reaction_data["post_id"]
    emoji = reaction_data["emoji"]

    existing = db.exec(
        select(Reaction).where(Reaction.user_id == user_id, Reaction.post_id == post_id)
    ).first()

    if existing:
        if existing.emoji == emoji:
            # Toggle off: delete the reaction
            db.delete(existing)
            db.commit()
            return None
        else:
            # Update emoji
            existing.emoji = emoji
            db.commit()
            db.refresh(existing)
            return existing
    else:
        reaction = Reaction(**reaction_data)
        db.add(reaction)
        db.commit()
        db.refresh(reaction)
        return reaction


def delete_reaction(db: Session, user_id: str, post_id: str, emoji: str) -> bool:
    """Delete a specific reaction."""
    existing = db.exec(
        select(Reaction).where(
            Reaction.user_id == user_id,
            Reaction.post_id == post_id,
            Reaction.emoji == emoji,
        )
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return True
    return False
