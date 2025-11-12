import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useLatestCourse = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["latest-course"],
		queryFn: async () => {
			const response = await api.courses.getAllCourses();
			// Return the first course (latest) from the list
			return response?.[0] || null;
		},
	});

	return {
		course: data,
		error: null,
		isLoading,
	};
};
