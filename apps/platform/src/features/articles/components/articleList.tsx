import { Avatar } from "@opencircle/ui";
import { Link, useNavigate } from "@tanstack/react-router";
import MDEditor from "@uiw/react-md-editor";
import { getInitials } from "../../../utils/common";
import { useArticles } from "../hooks/useArticles";

export const ArticleList = () => {
	const navigate = useNavigate();
	const { articles, isLoading } = useArticles();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{articles.map((article) => {
				const initials = getInitials(article.user.name);

				return (
					<main
						key={article.id}
						className="p-4 border-b border-border space-y-4"
					>
						<div
							onClick={() => navigate({ to: `/articles/${article.id}` })}
							className="cursor-pointer max-w-lg prose prose-invert prose-headings:text-base prose-headings:text-foreground prose-headings:font-medium prose-p:text-sm prose-p:text-foreground/40"
						>
							<h3 className="text-xl">{article.title}</h3>
							<MDEditor.Markdown
								source={`${article.content.slice(0, 200)}...`}
								className="!bg-transparent"
							/>
						</div>
						<section className="flex gap-2 items-center mt-4">
							<Avatar
								initials={initials}
								image_url={article.user.avatar_url || ""}
							/>
							<Link
								to="/$username"
								params={{ username: article.user.username }}
								className="group"
							>
								<div className="space-y-0.5">
									<div className="group-hover:underline">
										{article.user.name || article.user.email}
									</div>
									<p className="text-foreground/50 text-xs">
										{article.user.bio || article.user.username}
									</p>
								</div>
							</Link>
						</section>
					</main>
				);
			})}
		</div>
	);
};
