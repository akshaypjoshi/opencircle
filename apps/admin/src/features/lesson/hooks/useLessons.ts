import type { LessonCreate, LessonUpdate } from "@opencircle/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useLessons = (sectionId: string) => {
	const queryClient = useQueryClient();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["lessons", sectionId],
		queryFn: async () => {
			const response = await api.courses.getAllLessons(sectionId);
			// Sort by order
			return response.sort((a, b) => a.order - b.order);
		},
		enabled: !!sectionId,
	});

	const createLessonMutation = useMutation({
		mutationFn: async (data: LessonCreate) => {
			return await api.courses.createLesson(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lessons", sectionId] });
		},
	});

	const updateLessonMutation = useMutation({
		mutationFn: async ({ id, data }: { id: string; data: LessonUpdate }) => {
			return await api.courses.updateLesson(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lessons", sectionId] });
		},
	});

	const deleteLessonMutation = useMutation({
		mutationFn: async (id: string) => {
			return await api.courses.deleteLesson(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lessons", sectionId] });
		},
	});

	const reorderLessonsMutation = useMutation({
		mutationFn: async (lessons: Array<{ id: string; order: number }>) => {
			const promises = lessons.map(({ id, order }) =>
				api.courses.updateLesson(id, { order }),
			);
			return Promise.all(promises);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lessons", sectionId] });
		},
	});

	return {
		lessons: data || [],
		isLessonsLoading: isLoading,
		isLessonsError: isError,
		lessonsError: error,
		createLesson: createLessonMutation.mutateAsync,
		updateLesson: updateLessonMutation.mutateAsync,
		deleteLesson: deleteLessonMutation.mutateAsync,
		reorderLessons: reorderLessonsMutation.mutateAsync,
		isCreatingLesson: createLessonMutation.isPending,
		isUpdatingLesson: updateLessonMutation.isPending,
		isDeletingLesson: deleteLessonMutation.isPending,
		isReorderingLessons: reorderLessonsMutation.isPending,
	};
};
