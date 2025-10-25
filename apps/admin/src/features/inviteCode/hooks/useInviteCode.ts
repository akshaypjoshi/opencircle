import type { InviteCodeCreate, InviteCodeUpdate } from "@opencircle/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useInviteCode = (id?: string) => {
	const queryClient = useQueryClient();

	const { data: inviteCode, isLoading } = useQuery({
		queryKey: ["inviteCode", id],
		queryFn: async () => {
			if (!id) return null;
			return api.inviteCodes.getById(id);
		},
		enabled: !!id,
	});

	const createMutation = useMutation({
		mutationFn: async (data: InviteCodeCreate) => {
			return api.inviteCodes.create(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: async ({ id, ...data }: InviteCodeUpdate & { id: string }) => {
			return api.inviteCodes.update(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
			queryClient.invalidateQueries({ queryKey: ["inviteCode", id] });
		},
	});

	const deactivateMutation = useMutation({
		mutationFn: async (id: string) => {
			return api.inviteCodes.deactivate(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
			queryClient.invalidateQueries({ queryKey: ["inviteCode", id] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			return api.inviteCodes.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
			queryClient.invalidateQueries({ queryKey: ["inviteCode", id] });
		},
	});

	return {
		inviteCode,
		isLoading,
		createInviteCode: createMutation.mutateAsync,
		isCreating: createMutation.isPending,
		updateInviteCode: updateMutation.mutateAsync,
		isUpdating: updateMutation.isPending,
		deactivateInviteCode: deactivateMutation.mutateAsync,
		isDeactivating: deactivateMutation.isPending,
		deleteInviteCode: deleteMutation.mutateAsync,
		isDeleting: deleteMutation.isPending,
	};
};
