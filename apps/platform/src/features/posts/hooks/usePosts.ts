import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { api } from "../../../utils/api";

interface usePostsProps {
	skip?: number;
	limit?: number;
	userId?: string;
	parentId?: string;
	postType?: "posts" | "comment" | "article";
	channelSlug?: string;
}

export const usePosts = (props?: usePostsProps) => {
	const search = useSearch({ strict: false });
	const channelSlug = props?.channelSlug || (search as any)?.channel;

	const { data, isLoading } = useQuery({
		initialData: [],
		queryKey: ["posts", props, channelSlug],
		queryFn: async () => {
			const response = await api.posts.getAll(
				props?.limit,
				props?.skip,
				props?.userId,
				props?.postType,
				props?.parentId,
				channelSlug,
			);
			return response;
		},
	});

	return {
		posts: data,
		isPostLoading: isLoading,
	};
};
