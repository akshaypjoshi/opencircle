import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useCourseDelete = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteCourse, isPending: isDeleting } = useMutation({
		mutationFn: async (courseId: string) => {
			const response = await api.courses.deleteCourse(courseId);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["courses"] });
		},
		onError: (error) => {
			console.error("Failed to delete course:", error);
		},
	});

	return {
		deleteCourse,
		isDeleting,
	};
};
