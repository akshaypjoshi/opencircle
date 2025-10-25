import type { InviteCodeStatus } from "@opencircle/core";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";

interface UseInviteCodesProps {
	skip?: number;
	limit?: number;
	status?: InviteCodeStatus;
	createdBy?: string;
}

export const useInviteCodes = (props?: UseInviteCodesProps) => {
	const { data, isLoading } = useQuery({
		initialData: [],
		queryKey: ["inviteCodes", props],
		queryFn: async () => {
			const response = await api.inviteCodes.getAll(
				props?.skip,
				props?.limit,
				props?.status,
				props?.createdBy,
			);
			return response;
		},
	});

	return {
		inviteCodes: data,
		isInviteCodesLoading: isLoading,
	};
};
