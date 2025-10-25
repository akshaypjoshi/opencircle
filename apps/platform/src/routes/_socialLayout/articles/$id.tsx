import { createFileRoute } from "@tanstack/react-router";
import MDEditor from "@uiw/react-md-editor";
import { Header } from "../../../components/header";
import { useArticle } from "../../../features/articles/hooks/useArticle";

export const Route = createFileRoute("/_socialLayout/articles/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { article, isLoading } = useArticle(id);

	if (isLoading) return <div>Loading...</div>;

	return (
		<main>
			<Header label="Back" />
			<div className="prose prose-invert prose-headings:font-medium max-w-none p-4">
				<div className="prose prose-invert prose-headings:text-xl prose-headings:text-foreground prose-headings:font-medium prose-p:text-sm prose-p:leading-relaxed prose-p:text-foreground/70">
					<h3 className="text-xl">{article?.title}</h3>
					<MDEditor.Markdown
						source={article?.content}
						className="!bg-transparent"
					/>
				</div>
			</div>
		</main>
	);
}
