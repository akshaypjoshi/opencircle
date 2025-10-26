import { createFileRoute } from "@tanstack/react-router";
import { AppSettings } from "../../features/app-settings/components/AppSettings";

export const Route = createFileRoute("/_dashboardLayout/app-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AppSettings />;
}
