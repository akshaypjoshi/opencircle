import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useArticle = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["article", { id }],
		queryFn: async () => {
			const response = await api.articles.getById(id);
			return response;
		},
		enabled: !!id, // Only run query if id is provided
	});

	return {
		article: data,
		isArticleLoading: isLoading,
	};
};
