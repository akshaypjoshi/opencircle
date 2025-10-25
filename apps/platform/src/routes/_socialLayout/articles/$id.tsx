import { createFileRoute } from "@tanstack/react-router";
import MDEditor from "@uiw/react-md-editor";
import { useArticle } from "../../../features/articles/hooks/useArticle";

export const Route = createFileRoute("/_socialLayout/articles/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { article, isLoading } = useArticle(id);

	if (isLoading) return <div>Loading...</div>;

	return (
		<main className="p-4">
			<div className="prose prose-invert prose-headings:font-medium max-w-lg">
				<div className="prose prose-invert prose-headings:text-base prose-headings:text-foreground prose-headings:font-medium prose-p:text-sm prose-p:text-foreground/70">
					<MDEditor.Markdown
						source={article?.content}
						className="!bg-transparent"
					/>
				</div>
			</div>
		</main>
	);
}
