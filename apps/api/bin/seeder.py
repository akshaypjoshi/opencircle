import os
import sys

from sqlmodel import Session

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.database.engine import engine
from src.database.models import Media, Post, PostType, Reaction, Role, User
from src.modules.auth.auth_methods import hash_password


def create_users_and_posts():
    # Clear existing data first
    with Session(engine) as session:
        # Delete all existing data in reverse order of dependencies
        from sqlmodel import select

        reactions = session.exec(select(Reaction)).all()
        for reaction in reactions:
            session.delete(reaction)

        medias = session.exec(select(Media)).all()
        for media in medias:
            session.delete(media)

        posts = session.exec(select(Post)).all()
        for post in posts:
            session.delete(post)

        users = session.exec(select(User)).all()
        for user in users:
            session.delete(user)

        session.commit()
        print("Cleared existing data.")

    # Dummy data copied from apps/platform/src/dummy/posts.ts
    dummy_users = [
        {
            "username": "indrazm",
            "email": "me@indrazm.com",
            "password": "12345678",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar1.jpg",
            "role": Role.USER,
            "name": "Indra Zulfi M.",
            "bio": "Founder of OpenCircle",
            "initials": "IZ",
        },
        {
            "username": "jordan_maulana",
            "email": "jordan_maulana@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar2.jpg",
            "role": Role.USER,
            "name": "Jordan Maulana",
            "bio": "Developer",
            "initials": "JM",
        },
        {
            "username": "asrafil_rizal",
            "email": "asrafil_rizal@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar3.jpg",
            "role": Role.USER,
            "name": "Asrafil Rizal",
            "bio": "Designer",
            "initials": "AR",
        },
        {
            "username": "sarah_kim",
            "email": "sarah_kim@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar4.jpg",
            "role": Role.USER,
            "name": "Sarah Kim",
            "bio": "Product Manager",
            "initials": "SK",
        },
        {
            "username": "mike_lee",
            "email": "mike_lee@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar5.jpg",
            "role": Role.USER,
            "name": "Mike Lee",
            "bio": "Backend Engineer",
            "initials": "ML",
        },
        {
            "username": "emma_patel",
            "email": "emma_patel@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar6.jpg",
            "role": Role.USER,
            "name": "Emma Patel",
            "bio": "UX Researcher",
            "initials": "EP",
        },
        {
            "username": "david_thompson",
            "email": "david_thompson@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar7.jpg",
            "role": Role.USER,
            "name": "David Thompson",
            "bio": "DevOps Specialist",
            "initials": "DT",
        },
        {
            "username": "lisa_wang",
            "email": "lisa_wang@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar8.jpg",
            "role": Role.USER,
            "name": "Lisa Wang",
            "bio": "Data Analyst",
            "initials": "LW",
        },
        {
            "username": "robert_garcia",
            "email": "robert_garcia@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar9.jpg",
            "role": Role.USER,
            "name": "Robert Garcia",
            "bio": "Security Engineer",
            "initials": "RG",
        },
        {
            "username": "anna_hernandez",
            "email": "anna_hernandez@example.com",
            "password": "password123",
            "is_active": True,
            "is_verified": True,
            "avatar_url": "https://example.com/avatar10.jpg",
            "role": Role.USER,
            "name": "Anna Hernandez",
            "bio": "Marketing Lead",
            "initials": "AH",
        },
    ]

    dummy_posts = [
        {
            "id": "1",
            "user_username": "indrazm",
            "content": "Radix Primitives is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system, or adopt them incrementally.",
            "media": [
                "https://picsum.photos/400/300?random=1",
                "https://picsum.photos/400/300?random=2",
            ],
        },
        {
            "id": "2",
            "user_username": "jordan_maulana",
            "content": "Excited to share our latest updates on the platform. We've been working hard to improve the user experience!",
            "media": [],
        },
        {
            "id": "3",
            "user_username": "asrafil_rizal",
            "content": "Design is not just what it looks like and feels like. Design is how it works.",
            "media": ["https://picsum.photos/400/300?random=3"],
        },
        {
            "id": "4",
            "user_username": "sarah_kim",
            "content": "Just finished a great brainstorming session. Innovation happens when diverse minds come together!",
            "media": [],
        },
        {
            "id": "5",
            "user_username": "mike_lee",
            "content": "API design is crucial for scalable applications. Always think about future extensibility.",
            "media": [
                "https://picsum.photos/400/300?random=4",
                "https://picsum.photos/400/300?random=5",
                "https://picsum.photos/400/300?random=6",
            ],
        },
        {
            "id": "6",
            "user_username": "emma_patel",
            "content": "User feedback is the cornerstone of great design. Listen, iterate, and improve.",
            "media": [],
        },
        {
            "id": "7",
            "user_username": "david_thompson",
            "content": "Automation is key to efficient deployments. CI/CD pipelines save time and reduce errors.",
            "media": [],
        },
        {
            "id": "8",
            "user_username": "lisa_wang",
            "content": "Data tells a story. Analyzing trends helps us make informed decisions.",
            "media": [],
        },
        {
            "id": "9",
            "user_username": "robert_garcia",
            "content": "Security should be built into every layer of your application, not added as an afterthought.",
            "media": [],
        },
        {
            "id": "10",
            "user_username": "anna_hernandez",
            "content": "Building a community around your product is as important as the product itself.",
            "media": [],
        },
        {
            "id": "ad1",
            "user_username": "sarah_kim",
            "content": "What's your favorite design tool and why?",
            "media": [],
        },
        {
            "id": "ad2",
            "user_username": "mike_lee",
            "content": "Debating between GraphQL and REST APIs for our new project. Thoughts?",
            "media": [],
        },
        {
            "id": "so1",
            "user_username": "emma_patel",
            "content": "Just launched our new mobile app! Check it out and let me know what you think.",
            "media": [],
        },
    ]

    dummy_comments = [
        {
            "content": "Totally agree! Accessibility is key for inclusive design.",
            "user_username": "asrafil_rizal",
            "parent_id": "1",
        },
        {
            "content": "Love the updates! The new features are amazing.",
            "user_username": "sarah_kim",
            "parent_id": "2",
        },
        {
            "content": "Steve Jobs said that, right? Great reminder!",
            "user_username": "emma_patel",
            "parent_id": "3",
        },
        {
            "content": "Diverse teams lead to better innovation. Well said!",
            "user_username": "mike_lee",
            "parent_id": "4",
        },
        {
            "content": "GraphQL for flexibility, REST for simplicity. Depends on the use case!",
            "user_username": "david_thompson",
            "parent_id": "5",
        },
        {
            "content": "User feedback loops are essential for product success.",
            "user_username": "lisa_wang",
            "parent_id": "6",
        },
        {
            "content": "CI/CD is a game changer for development teams.",
            "user_username": "robert_garcia",
            "parent_id": "7",
        },
        {
            "content": "Data-driven decisions are the future!",
            "user_username": "anna_hernandez",
            "parent_id": "8",
        },
        {
            "content": "Security by design is crucial. Great point!",
            "user_username": "indrazm",
            "parent_id": "9",
        },
        {
            "content": "Community building takes time but pays off.",
            "user_username": "jordan_maulana",
            "parent_id": "10",
        },
        {
            "content": "Figma for me! It's collaborative and powerful.",
            "user_username": "asrafil_rizal",
            "parent_id": "ad1",
        },
        {
            "content": "GraphQL if you need efficient queries, REST if you want simplicity.",
            "user_username": "emma_patel",
            "parent_id": "ad2",
        },
        {
            "content": "Congrats on the launch! Will check it out soon.",
            "user_username": "david_thompson",
            "parent_id": "so1",
        },
    ]

    dummy_reactions = [
        {
            "user_username": "jordan_maulana",
            "post_id": "1",
            "emoji": "👍",
        },
        {
            "user_username": "asrafil_rizal",
            "post_id": "1",
            "emoji": "❤️",
        },
        {
            "user_username": "sarah_kim",
            "post_id": "2",
            "emoji": "🎉",
        },
        {
            "user_username": "mike_lee",
            "post_id": "3",
            "emoji": "💡",
        },
        {
            "user_username": "emma_patel",
            "post_id": "4",
            "emoji": "👏",
        },
        {
            "user_username": "david_thompson",
            "post_id": "5",
            "emoji": "🚀",
        },
        {
            "user_username": "lisa_wang",
            "post_id": "6",
            "emoji": "📊",
        },
        {
            "user_username": "robert_garcia",
            "post_id": "7",
            "emoji": "🔒",
        },
        {
            "user_username": "anna_hernandez",
            "post_id": "8",
            "emoji": "📈",
        },
        {
            "user_username": "indrazm",
            "post_id": "9",
            "emoji": "🛡️",
        },
        {
            "user_username": "jordan_maulana",
            "post_id": "10",
            "emoji": "🌟",
        },
        {
            "user_username": "asrafil_rizal",
            "post_id": "ad1",
            "emoji": "🎨",
        },
        {
            "user_username": "emma_patel",
            "post_id": "ad2",
            "emoji": "🔗",
        },
        {
            "user_username": "david_thompson",
            "post_id": "so1",
            "emoji": "📱",
        },
        {
            "user_username": "sarah_kim",
            "post_id": "1",
            "emoji": "😂",
        },
    ]

    with Session(engine) as session:
        users = []
        for user_data in dummy_users:
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password=hash_password(str(user_data["password"])),
                is_active=user_data["is_active"],
                is_verified=user_data["is_verified"],
                avatar_url=user_data["avatar_url"],
                name=user_data["name"],
                bio=user_data["bio"],
                role=user_data["role"],
            )
            session.add(user)
            users.append(user)

        session.commit()  # Commit to get user IDs

        user_map = {user.username: user for user in users}
        post_map = {}

        for post_data in dummy_posts:
            user = user_map[post_data["user_username"]]
            post = Post(
                content=post_data["content"], type=PostType.POST, user_id=user.id
            )
            session.add(post)
            session.commit()  # Commit to get post ID
            post_map[post_data["id"]] = post

            for media_url in post_data["media"]:
                media = Media(url=media_url, post_id=post.id, user_id=user.id)
                session.add(media)

        for comment_data in dummy_comments:
            user = user_map[comment_data["user_username"]]
            parent_post = post_map[comment_data["parent_id"]]
            comment = Post(
                content=comment_data["content"],
                type=PostType.COMMENT,
                user_id=user.id,
                parent_id=parent_post.id,
            )
            session.add(comment)

        for reaction_data in dummy_reactions:
            user = user_map[reaction_data["user_username"]]
            post = post_map[reaction_data["post_id"]]
            reaction = Reaction(
                user_id=user.id,
                post_id=post.id,
                emoji=reaction_data["emoji"],
            )
            session.add(reaction)

        session.commit()
        print("Seeded users, posts, comments, and reactions from dummy data.")


if __name__ == "__main__":
    create_users_and_posts()
