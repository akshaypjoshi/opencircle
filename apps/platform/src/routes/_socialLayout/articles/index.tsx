import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../../../components/header";
import { ArticleList } from "../../../features/articles/components/articleList";

export const Route = createFileRoute("/_socialLayout/articles/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Header label="Articles" />
			<ArticleList />
		</>
	);
}
