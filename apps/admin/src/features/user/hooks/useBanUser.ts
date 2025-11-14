import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useBanUser = () => {
	const queryClient = useQueryClient();

	const { mutate: banUser, isPending: isBanning } = useMutation({
		mutationFn: async (userId: string) => {
			const response = await api.users.ban(userId);
			return response;
		},
		onSuccess: (_, userId) => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user", { id: userId }] });
		},
		onError: (error) => {
			console.error("Failed to ban user:", error);
		},
	});

	return {
		banUser,
		isBanning,
	};
};
