import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useCourse = (id: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["course", id],
		queryFn: async () => {
			const response = await api.courses.getCourseById(id);
			return response;
		},
		enabled: !!id,
	});

	return {
		course: data,
		isCourseLoading: isLoading,
		isCourseError: isError,
		courseError: error,
	};
};
