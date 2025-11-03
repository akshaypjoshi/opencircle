import { useNotifications } from "../hooks/useNotifications";

export const NotificationNumbers = () => {
	const { notifications } = useNotifications();

	if (
		notifications.filter((notification) => notification.is_read === false)
			.length === 0
	) {
		return null;
	}

	if (
		notifications.filter((notification) => notification.is_read === false)
			.length > 99
	) {
		return (
			<div className="ml-1 bg-primary size-5 flex items-center justify-center rounded-md text-[9px] font-medium">
				99+
			</div>
		);
	}

	return (
		<div className="ml-1 bg-primary size-5 flex items-center justify-center rounded-md text-[9px] font-medium">
			{
				notifications.filter((notification) => notification.is_read === false)
					.length
			}
		</div>
	);
};
