import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useUnbanUser = () => {
	const queryClient = useQueryClient();

	const { mutate: unbanUser, isPending: isUnbanning } = useMutation({
		mutationFn: async (userId: string) => {
			const response = await api.users.update(userId, { is_active: true });
			return response;
		},
		onSuccess: (_, userId) => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user", { id: userId }] });
		},
		onError: (error) => {
			console.error("Failed to unban user:", error);
		},
	});

	return {
		unbanUser,
		isUnbanning,
	};
};
