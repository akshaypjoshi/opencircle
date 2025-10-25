import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Header } from "../../components/header";
import { PostForm } from "../../features/posts/components/postForm";
import { PostsList } from "../../features/timeline/components/postsList";

const searchSchema = z.object({
	channel: z.string().optional(),
});

export const Route = createFileRoute("/_socialLayout/")({
	validateSearch: zodValidator(searchSchema),
	component: Index,
});

function Index() {
	return (
		<>
			<Header label="Timeline" />
			<main>
				<PostForm />
				<PostsList />
			</main>
		</>
	);
}
