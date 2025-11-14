import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteUser, isPending: isDeleting } = useMutation({
		mutationFn: async (userId: string) => {
			const response = await api.users.delete(userId);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error) => {
			console.error("Failed to delete user:", error);
		},
	});

	return {
		deleteUser,
		isDeleting,
	};
};
