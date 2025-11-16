import type { AppSettingsUpdate } from "@opencircle/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";

export const useAppSettings = () => {
	const queryClient = useQueryClient();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["appSettings"],
		queryFn: async () => {
			const response = await api.appSettings.getSettings();
			return response;
		},
	});

	const updateMutation = useMutation({
		mutationFn: async (data: AppSettingsUpdate) => {
			const response = await api.appSettings.updateSettings(data);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["appSettings"] });
		},
	});

	const {
		data: installationData,
		isLoading: isInstallationLoading,
		isError: isInstallationError,
		error: installationError,
	} = useQuery({
		queryKey: ["installationStatus"],
		queryFn: async () => {
			const response = await api.appSettings.getInstallationStatus();
			return response;
		},
	});

	return {
		appSettings: data,
		isAppSettingsLoading: isLoading,
		isAppSettingsError: isError,
		appSettingsError: error,
		updateAppSettings: updateMutation.mutate,
		isUpdatingAppSettings: updateMutation.isPending,
		installationStatus: installationData,
		isInstallationLoading,
		isInstallationError,
		installationError,
	};
};
