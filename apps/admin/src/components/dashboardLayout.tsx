import { Sidebar } from "./sidebar";

interface DashBoardLayoutProps {
	children: React.ReactNode;
}

export const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
	return (
		<div className="relative flex min-h-screen">
			<Sidebar />
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
};
