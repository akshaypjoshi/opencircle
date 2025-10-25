import type { SectionCreate, SectionUpdate } from "@opencircle/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useSections = (courseId: string) => {
	const queryClient = useQueryClient();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["sections", courseId],
		queryFn: async () => {
			const response = await api.courses.getAllSections(courseId);
			// Sort by order
			return response.sort((a, b) => a.order - b.order);
		},
		enabled: !!courseId,
	});

	const createSectionMutation = useMutation({
		mutationFn: async (data: SectionCreate) => {
			return await api.courses.createSection(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
		},
	});

	const updateSectionMutation = useMutation({
		mutationFn: async ({ id, data }: { id: string; data: SectionUpdate }) => {
			return await api.courses.updateSection(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
		},
		onError: (error) => {
			console.error("Failed to update section:", error);
		},
	});

	const deleteSectionMutation = useMutation({
		mutationFn: async (id: string) => {
			return await api.courses.deleteSection(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
		},
		onError: (error) => {
			console.error("Failed to delete section:", error);
		},
	});

	const reorderSectionsMutation = useMutation({
		mutationFn: async (sections: Array<{ id: string; order: number }>) => {
			const promises = sections.map(({ id, order }) =>
				api.courses.updateSection(id, { order }),
			);
			return Promise.all(promises);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
		},
	});

	return {
		sections: data || [],
		isSectionsLoading: isLoading,
		isSectionsError: isError,
		sectionsError: error,
		createSection: createSectionMutation.mutateAsync,
		updateSection: updateSectionMutation.mutateAsync,
		deleteSection: deleteSectionMutation.mutateAsync,
		reorderSections: reorderSectionsMutation.mutateAsync,
		isCreatingSection: createSectionMutation.isPending,
		isUpdatingSection: updateSectionMutation.isPending,
		isDeletingSection: deleteSectionMutation.isPending,
		isReorderingSections: reorderSectionsMutation.isPending,
	};
};
