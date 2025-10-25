import type { ChannelCreate } from "@opencircle/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useChannelCreation = () => {
	const queryClient = useQueryClient();

	const { mutate: createChannel, isPending } = useMutation({
		mutationFn: async (data: ChannelCreate) => {
			const response = await api.channels.create(data);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["channels"] });
		},
	});

	return {
		createChannel,
		isSubmitting: isPending,
	};
};
