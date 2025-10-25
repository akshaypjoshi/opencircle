import { Button } from "@opencircle/ui";
import { Link } from "@tanstack/react-router";
import { Stars } from "lucide-react";
import { useAccount } from "../features/auth/hooks/useAccount";
import { UserCard } from "../features/user/components/userCard";

export const RightSidebar = () => {
	const { account } = useAccount();

	return (
		<div className="sticky top-0 h-screen">
			{account ? (
				<UserCard account={account} />
			) : (
				<section className="px-4 h-14 flex justify-between items-center">
					<div />
					<div className="flex gap-4 items-center">
						<Link to="/register">
							<div className="text-xs font-medium">Sign up</div>
						</Link>
						<Link to="/login">
							<Button size="sm">Login</Button>
						</Link>
					</div>
				</section>
			)}
			<main className="p-4 space-y-8">
				<section className="bg-linear-210 from-primary/40 to-primary/20 border border-border rounded-lg">
					<div className="p-4 text-sm font-medium flex justify-between items-center">
						<div>Picked Courses for You!</div>
						<Stars size={14} />
					</div>
					<div className="bg-background-secondary border border-border p-4 rounded-lg space-y-2">
						<h1>Build Job Directory App with Tanstack Router 2025</h1>
						<p className="text-xs text-foreground/50 text-balance">
							Learn how to build a job directory app using Tanstack Router.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
};
