import { createFileRoute } from "@tanstack/react-router";
import { ArticleList } from "../../features/articles/components/ArticleList";
import {
	useArticleSubmission,
	useArticles,
} from "../../features/articles/hooks";

export const Route = createFileRoute("/_dashboardLayout/articles/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { articles, isArticlesLoading } = useArticles();
	const { deleteArticle } = useArticleSubmission();

	const handleDelete = async (id: string) => {
		if (window.confirm("Are you sure you want to delete this article?")) {
			try {
				await deleteArticle(id);
			} catch (error) {
				console.error("Failed to delete article:", error);
			}
		}
	};

	return (
		<ArticleList
			articles={articles || []}
			onDelete={handleDelete}
			loading={isArticlesLoading}
		/>
	);
}
