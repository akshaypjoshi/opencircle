import type { Post, ReactionsByEmoji } from "@opencircle/core";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { DropdownMenu, HoverCard } from "radix-ui";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { useReactionSubmission } from "../../reactions/hooks/useReactionSubmission";

interface PostCardReactionsProps {
	post: Post;
}

export const PostCardReactions = ({ post }: PostCardReactionsProps) => {
	const { submitReaction } = useReactionSubmission();
	const [reactionDetails, setReactionDetails] = useState<ReactionsByEmoji[]>(
		[],
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchReactions = async () => {
			try {
				setLoading(true);
				const data = await api.reactions.getByPostId(post.id);
				console.log("Fetched reactions:", data);
				setReactionDetails(data);
			} catch (error) {
				console.error("Failed to fetch reactions:", error);
			} finally {
				setLoading(false);
			}
		};

		if (post.reactions?.summary && post.reactions.summary.length > 0) {
			fetchReactions();
		}
	}, [post.id, post.reactions?.summary]);

	const totalReactions =
		post.reactions?.summary?.reduce((sum, r) => sum + r.count, 0) || 0;

	return (
		<div className="flex items-center gap-1 text-sm">
			{post.reactions?.summary && post.reactions.summary.length > 0 ? (
				<HoverCard.Root openDelay={200}>
					<HoverCard.Trigger asChild>
						<div className="flex items-center gap-1">
							{post.reactions.summary.map((reaction) => (
								<div
									key={reaction.emoji}
									className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm cursor-pointer ${
										reaction.me
											? "bg-primary/20 border border-primary/30"
											: "bg-background-secondary hover:bg-background-tertiary"
									}`}
									onClick={() => {
										submitReaction({
											post_id: post.id,
											emoji: reaction.emoji,
										});
									}}
								>
									<span>{reaction.emoji}</span>
									<span>{reaction.count}</span>
								</div>
							))}
							{!post.reactions.summary.some((reaction) => reaction.me) && (
								<DropdownMenu.Root>
									<DropdownMenu.Trigger className="ml-1">
										<Smile strokeWidth={1.5} size={16} />
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="start" side="bottom">
										<EmojiPicker
											theme={Theme.DARK}
											emojiStyle={EmojiStyle.TWITTER}
											reactionsDefaultOpen
											skinTonesDisabled
											onEmojiClick={(emojiData) => {
												submitReaction({
													post_id: post.id,
													emoji: emojiData.emoji,
												});
											}}
											className="z-[999999] bg-background"
										/>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							)}
						</div>
					</HoverCard.Trigger>
					<HoverCard.Portal>
						<HoverCard.Content
							className="z-[999999] w-[280px] rounded-md bg-background p-3 border border-border shadow-2xl shadow-black"
							sideOffset={5}
						>
							<div className="flex flex-col gap-2">
								<div className="text-xs font-semibold text-muted-foreground mb-1">
									{totalReactions}{" "}
									{totalReactions === 1 ? "reaction" : "reactions"}
								</div>

								{loading ? (
									<div className="text-xs text-muted-foreground">
										Loading...
									</div>
								) : (
									<div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto">
										{reactionDetails.map((reactionGroup) =>
											reactionGroup.users.map((reaction_user) => (
												<div
													key={`${reaction_user.user_id}-${reactionGroup.emoji}`}
													className="flex items-center justify-between gap-2 py-1"
												>
													<div className="flex-1 min-w-0">
														<div className="text-xs font-medium truncate">
															{reaction_user.user.name}
														</div>
													</div>
													<span className="text-sm flex-shrink-0">
														{reactionGroup.emoji}
													</span>
												</div>
											)),
										)}
									</div>
								)}
							</div>
							<HoverCard.Arrow className="fill-background" />
						</HoverCard.Content>
					</HoverCard.Portal>
				</HoverCard.Root>
			) : (
				<div className="flex items-center gap-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Smile strokeWidth={1.5} size={18} />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start" side="bottom">
							<EmojiPicker
								theme={Theme.DARK}
								emojiStyle={EmojiStyle.TWITTER}
								reactionsDefaultOpen
								skinTonesDisabled
								onEmojiClick={(emojiData) => {
									submitReaction({
										post_id: post.id,
										emoji: emojiData.emoji,
									});
								}}
								className="z-[999999] bg-background"
							/>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			)}
		</div>
	);
};
