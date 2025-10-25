import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

interface UseArticlesProps {
	skip?: number;
	limit?: number;
	userId?: string;
	search?: string;
}

export const useArticles = (props?: UseArticlesProps) => {
	const { data, isLoading } = useQuery({
		initialData: [],
		queryKey: ["articles", props],
		queryFn: async () => {
			const response = await api.articles.getAll(
				props?.limit,
				props?.skip,
				props?.userId,
			);
			return response;
		},
	});

	return {
		articles: data,
		isArticlesLoading: isLoading,
	};
};
