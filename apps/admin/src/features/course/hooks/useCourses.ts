import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useCourses = (
	skip: number = 0,
	limit: number = 100,
	instructorId?: string,
	status?: string,
) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["courses", { skip, limit, instructorId, status }],
		queryFn: async () => {
			const response = await api.courses.getAllCourses(
				skip,
				limit,
				instructorId,
				status,
			);
			return response;
		},
	});

	return {
		courses: data || [],
		isCoursesLoading: isLoading,
		isCoursesError: isError,
		coursesError: error,
	};
};
