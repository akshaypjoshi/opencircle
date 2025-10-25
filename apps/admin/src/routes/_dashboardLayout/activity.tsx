import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/activity")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Activity</div>;
}
