import type { Post } from "@opencircle/core";
import { Avatar, Button } from "@opencircle/ui";
import { Link } from "@tanstack/react-router";
import { EllipsisVertical } from "lucide-react";
import moment from "moment";
import { DropdownMenu } from "radix-ui";
import { useState } from "react";
import { getInitials } from "../../../utils/common";
import { useAccount } from "../../auth/hooks/useAccount";
import { MediaGallery } from "../../media/components/media";
import { usePostDelete } from "../hooks/usePostDelete";
import { renderContent } from "../utils";
import { PostCardReactions } from "./postCardReactions";
import { ReplyForm } from "./replyForm";

interface RepliesListProps {
	posts: Post[];
}

export function RepliesList({ posts }: RepliesListProps) {
	const { account } = useAccount();
	const { deletePost } = usePostDelete();
	const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>(
		{},
	);

	const getDepth = (post: Post, currentDepth = 0): number => {
		if (!post.parent_id) return currentDepth;
		const parent = posts.find((p) => p.id === post.parent_id);
		return parent ? getDepth(parent, currentDepth + 1) : currentDepth;
	};

	return (
		<section className="border-t border-border">
			{posts.map((post) => {
				const replyInitials = getInitials(post.user.username);
				const depth = getDepth(post);

				return (
					<main
						key={post.id}
						className={`relative max-w-2xl p-4 border-b border-border ${depth > 0 ? "ml-8" : ""}`}
					>
						{/* Vertical line for nested replies */}
						{depth > 0 && (
							<div
								className="absolute left-0 top-0 bottom-0 w-px bg-border"
								style={{ left: "0" }}
							/>
						)}

						{post.user_id === account?.id && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild>
									<div className="w-6 h-6 bg-background-secondary absolute top-4 right-4 flex justify-center items-center rounded-lg">
										<EllipsisVertical size={12} className="" />
									</div>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									sideOffset={10}
									align="end"
									className="rounded-lg overflow-hidden bg-background-secondary border border-border min-w-[80px] shadow-2xl text-xs font-medium"
								>
									<DropdownMenu.Item
										className="p-3 hover:bg-primary focus-within:outline-none"
										onClick={() => deletePost(post.id)}
									>
										Delete
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						<section className="flex gap-2 items-center">
							<Avatar
								initials={replyInitials}
								image_url={post.user.avatar_url || ""}
							/>
							<Link
								to="/$username"
								params={{ username: post.user.username }}
								className="group"
							>
								<div className="space-y-0.5">
									<div className="group-hover:underline">
										{post.user.name || post.user.email}
									</div>
									<p className="text-foreground/50 text-xs">
										{post.user.bio || post.user.username}
									</p>
								</div>
							</Link>
						</section>
						<section className="ml-10 space-y-4">
							<p className="whitespace-pre-line">
								{renderContent(post.content)}
							</p>
							<MediaGallery media={post.medias} />
							<div className="text-xs text-foreground/50">
								{moment.utc(post.created_at).fromNow()}
							</div>
							<section className="flex gap-4 items-center">
								<Button
									size="sm"
									variant="secondary"
									onClick={() =>
										setShowReplyForm((prev) => ({
											...prev,
											[post.id]: !prev[post.id],
										}))
									}
									disabled={!account}
								>
									Reply
								</Button>
								<PostCardReactions post={post} />
							</section>

							{showReplyForm[post.id] && (
								<ReplyForm
									parentId={post.id}
									onReply={() =>
										setShowReplyForm((prev) => ({ ...prev, [post.id]: false }))
									}
								/>
							)}
						</section>
					</main>
				);
			})}
		</section>
	);
}
