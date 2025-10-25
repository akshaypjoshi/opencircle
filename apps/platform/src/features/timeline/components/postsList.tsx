import { PostCard } from "../../posts/components/postCard";
import { usePosts } from "../../posts/hooks/usePosts";

export const PostsList = () => {
	const { posts, isPostLoading } = usePosts();

	if (isPostLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</>
	);
};
