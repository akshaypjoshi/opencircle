import { createFileRoute } from "@tanstack/react-router";
import { UserTable } from "../../features/user/components/userTable";
import { useUsers } from "../../features/user/hooks/useUsers";

export const Route = createFileRoute("/_dashboardLayout/users")({
	component: RouteComponent,
});

function RouteComponent() {
	const { users, isUsersLoading } = useUsers();

	return (
		<main>
			<h1 className="text-2xl font-medium mb-4">Users</h1>
			<UserTable users={users} isLoading={isUsersLoading} />
		</main>
	);
}
