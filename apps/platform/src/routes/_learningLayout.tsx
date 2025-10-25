import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_learningLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
