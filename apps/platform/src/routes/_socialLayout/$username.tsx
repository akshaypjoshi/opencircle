import { Avatar } from "@opencircle/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../../components/header";
import { useUser } from "../../features/user/hooks/useUser";
import { getInitials } from "../../utils/common";

export const Route = createFileRoute("/_socialLayout/$username")({
	component: UserDetail,
});

function UserDetail() {
	const username = Route.useParams().username;
	const { user } = useUser(username);

	if (!user) {
		return <div>User not found</div>;
	}

	const initials = getInitials(user.name);

	return (
		<main>
			<Header label="Back" />
			<section className="flex flex-col items-center py-12 space-y-4">
				<Avatar
					size="xl"
					initials={initials}
					image_url={user.avatar_url || ""}
				/>
				<main className="flex flex-col items-center gap-4">
					<div className="text-center space-y-2">
						<div className="text-xl">{user.name}</div>
						<div className="text-xs font-medium text-foreground/50">
							{user.email}
						</div>
					</div>
					<div>{user.bio}</div>
				</main>
			</section>
			<section className="justify-center p-4 flex gap-8 border-y border-border">
				<div>Posts</div>
				<div>Replies</div>
				<div>Media</div>
				<div>Joined Courses</div>
			</section>
		</main>
	);
}
