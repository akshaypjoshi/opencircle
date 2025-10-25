import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../../../components/header";
import { NotificationList } from "../../../features/notifications/components/NotificationList";

export const Route = createFileRoute("/_socialLayout/notifications/")({
	component: Notifications,
});

function Notifications() {
	return (
		<>
			<Header label="Notifications" />
			<main>
				<NotificationList />
			</main>
		</>
	);
}
