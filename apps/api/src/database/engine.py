from sqlmodel import Session, create_engine

from src.core.settings import settings

engine = create_engine(settings.DB_URL)


def get_session():
    with Session(engine) as session:
        yield session
