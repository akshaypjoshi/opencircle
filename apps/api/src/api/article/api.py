from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.api.account.api import get_current_user
from src.api.article.serializer import ArticleCreate, ArticleResponse, ArticleUpdate
from src.database.engine import get_session
from src.database.models import User
from src.modules.article.article_methods import (
    create_article,
    delete_article,
    get_all_articles,
    get_article,
    get_articles_by_user,
    update_article,
)
from src.modules.post.post_methods import get_comment_summary, get_reactions_summary

router = APIRouter()


def build_article_response_data(
    article, current_user_id: Optional[str], db: Session
) -> dict:
    """Helper function to build article response data with relationships and reactions."""
    return {
        "id": article.id,
        "title": article.title,
        "content": article.content,
        "type": article.type,
        "user_id": article.user_id,
        "channel_id": article.channel_id,
        "parent_id": article.parent_id,
        "user": article.user,
        "channel": article.channel,
        "medias": article.medias,
        "created_at": article.created_at,
        "updated_at": article.updated_at,
        "comment_count": article.comment_count,
        "reaction_count": article.reaction_count,
        "reactions": get_reactions_summary(db, article.id, current_user_id),
        "comment_summary": get_comment_summary(db, article.id, current_user_id),
    }


@router.post("/articles/", response_model=ArticleResponse)
def create_article_endpoint(
    article: ArticleCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Create a new article."""
    article_data = article.model_dump()
    created_article = create_article(db, article_data)

    # Get the full article with relationships
    full_article = get_article(db, created_article.id)
    article_response_data = build_article_response_data(
        full_article, current_user.id, db
    )
    return ArticleResponse(**article_response_data)


@router.get("/articles/{article_id}", response_model=ArticleResponse)
def get_article_endpoint(
    article_id: str,
    db: Session = Depends(get_session),
):
    """Get an article by ID."""
    article = get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article_response_data = build_article_response_data(article, None, db)
    return ArticleResponse(**article_response_data)


@router.get("/articles/", response_model=List[ArticleResponse])
def get_all_articles_endpoint(
    skip: int = 0,
    limit: int = 100,
    user_id: Optional[str] = None,
    db: Session = Depends(get_session),
):
    """Get all articles with optional user filter."""
    if user_id:
        articles = get_articles_by_user(db, user_id, skip, limit)
    else:
        articles = get_all_articles(db, skip, limit)

    response_articles = []
    for article in articles:
        article_response_data = build_article_response_data(article, None, db)
        response_articles.append(ArticleResponse(**article_response_data))
    return response_articles


@router.put("/articles/{article_id}", response_model=ArticleResponse)
def update_article_endpoint(
    article_id: str,
    article: ArticleUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Update an article."""
    update_data = {k: v for k, v in article.model_dump().items() if v is not None}
    updated_article = update_article(db, article_id, update_data)

    if not updated_article:
        raise HTTPException(status_code=404, detail="Article not found")

    # Get the full article with relationships
    full_article = get_article(db, updated_article.id)
    article_response_data = build_article_response_data(
        full_article, current_user.id, db
    )
    return ArticleResponse(**article_response_data)


@router.delete("/articles/{article_id}")
def delete_article_endpoint(
    article_id: str,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Delete an article."""
    if not delete_article(db, article_id):
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted"}
