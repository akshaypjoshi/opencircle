import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArticleEditor } from "../../features/articles/components/ArticleEditor";
import {
	useArticle,
	useArticleSubmission,
} from "../../features/articles/hooks";
import type {
	CreateArticleRequest,
	UpdateArticleRequest,
} from "../../features/articles/types/article";

export const Route = createFileRoute("/_dashboardLayout/articles/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const router = useRouter();
	const { article, isArticleLoading } = useArticle(id);
	const { updateArticle, isSubmitting } = useArticleSubmission();

	const handleSave = async (
		data: CreateArticleRequest | UpdateArticleRequest,
	) => {
		try {
			await updateArticle({ id, ...data });
			// Redirect to article view
			router.navigate({ to: `/articles/${id}` });
		} catch (error) {
			console.error("Failed to update article:", error);
		}
	};

	const handleCancel = () => {
		router.navigate({ to: `/articles/${id}` });
	};

	if (isArticleLoading || !article) {
		return <div>Loading...</div>;
	}

	return (
		<ArticleEditor
			article={article}
			onSave={handleSave}
			onCancel={handleCancel}
			loading={isSubmitting}
			isEdit={true}
		/>
	);
}
