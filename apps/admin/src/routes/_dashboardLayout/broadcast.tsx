import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/broadcast")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Broadcast</div>;
}
