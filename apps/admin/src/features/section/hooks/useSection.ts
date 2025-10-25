import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useSection = (id: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["section", id],
		queryFn: async () => {
			const response = await api.courses.getSectionById(id);
			return response;
		},
		enabled: !!id,
	});

	return {
		section: data,
		isSectionLoading: isLoading,
		isSectionError: isError,
		sectionError: error,
	};
};
