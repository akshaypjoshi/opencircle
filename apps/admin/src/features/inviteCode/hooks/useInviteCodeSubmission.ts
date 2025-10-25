import type { InviteCodeCreate, InviteCodeUpdate } from "@opencircle/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useInviteCodeSubmission = () => {
	const queryClient = useQueryClient();

	const { mutate: createInviteCode, isPending: isCreating } = useMutation({
		mutationFn: async (data: InviteCodeCreate) => {
			const response = await api.inviteCodes.create(data);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
		},
	});

	const { mutate: updateInviteCode, isPending: isUpdating } = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: InviteCodeUpdate;
		}) => {
			const response = await api.inviteCodes.update(id, data);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
			queryClient.invalidateQueries({ queryKey: ["inviteCode"] });
		},
	});

	const { mutate: deleteInviteCode, isPending: isDeleting } = useMutation({
		mutationFn: async (inviteCodeId: string) => {
			const response = await api.inviteCodes.delete(inviteCodeId);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
		},
	});

	const { mutate: deactivateInviteCode, isPending: isDeactivating } =
		useMutation({
			mutationFn: async (inviteCodeId: string) => {
				const response = await api.inviteCodes.deactivate(inviteCodeId);
				return response;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
				queryClient.invalidateQueries({ queryKey: ["inviteCode"] });
			},
		});

	return {
		createInviteCode,
		updateInviteCode,
		deleteInviteCode,
		deactivateInviteCode,
		isSubmitting: isCreating || isUpdating || isDeleting || isDeactivating,
		isCreating,
		isUpdating,
		isDeleting,
		isDeactivating,
	};
};
