import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useLesson = (id: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["lesson", id],
		queryFn: async () => {
			const response = await api.courses.getLessonById(id);
			return response;
		},
		enabled: !!id,
	});

	return {
		lesson: data,
		isLessonLoading: isLoading,
		isLessonError: isError,
		lessonError: error,
	};
};
