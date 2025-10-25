import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Settings</div>;
}
