import type { Notification } from "@opencircle/core";
import { Avatar, Button } from "@opencircle/ui";
import moment from "moment";
import { useMarkNotificationAsRead } from "../hooks";

interface NotificationItemProps {
	notification: Notification;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
	const { markAsRead, isMarkingAsRead } = useMarkNotificationAsRead();

	const getTimeAgo = (dateString: string) => {
		try {
			return moment.utc(dateString).fromNow();
		} catch {
			return "Unknown time";
		}
	};

	const handleMarkAsRead = () => {
		if (!notification.is_read) {
			markAsRead(notification.id);
		}
	};

	const getNotificationMessage = () => {
		switch (notification.type) {
			case "mention":
				return `${notification.sender.username} mentioned you`;
			case "like":
				return `${notification.sender.username} liked your post`;
			default:
				return `${notification.sender.username} sent you a notification`;
		}
	};

	return (
		<div
			className="flex gap-3 p-3 hover:bg-accent transition-colors duration-150"
			style={{ opacity: notification.is_read ? "50%" : "100%" }}
		>
			<Avatar
				image_url={notification.sender.avatar_url || ""}
				initials={notification.sender.username.charAt(0).toUpperCase()}
			/>
			<div className="flex-1 min-w-0">
				<p className="text-sm text-foreground truncate">
					{getNotificationMessage()}
				</p>
				<p className="text-xs text-muted-foreground">
					{getTimeAgo(notification.created_at)}
				</p>
			</div>
			<div className="flex items-center gap-2">
				{!notification.is_read && (
					<>
						<Button
							variant="secondary"
							size="sm"
							onClick={handleMarkAsRead}
							disabled={isMarkingAsRead}
							className="text-xs"
						>
							{isMarkingAsRead ? "Marking..." : "Mark as read"}
						</Button>
						<div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
					</>
				)}
			</div>
		</div>
	);
};
