import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useChannels = (skip: number = 0, limit: number = 100) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["channels", { skip, limit }],
		queryFn: async () => {
			const response = await api.channels.getAll(skip, limit);
			return response;
		},
	});

	return {
		channels: data || [],
		isChannelsLoading: isLoading,
		isChannelsError: isError,
		channelsError: error,
	};
};
