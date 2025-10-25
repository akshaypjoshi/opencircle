import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashBoardLayout } from "../components/dashboardLayout";

export const Route = createFileRoute("/_dashboardLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<DashBoardLayout>
			<Outlet />
		</DashBoardLayout>
	);
}
