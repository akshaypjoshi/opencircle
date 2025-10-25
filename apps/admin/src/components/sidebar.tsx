import { Input } from "@opencircle/ui";
import { Link } from "@tanstack/react-router";
import { BookOpen, FileText, Hash, Key, Users, Zap } from "lucide-react";

interface MenuItemProps {
	icon: React.ReactNode;
	label: string;
	to: string;
}

const MenuItem = ({ icon, label, to }: MenuItemProps) => {
	return (
		<Link
			to={to}
			className="flex text-sm items-center cursor-pointer hover:bg-primary rounded-lg p-2 transition duration-150"
		>
			{icon}
			<span className="ml-3">{label}</span>
		</Link>
	);
};

export const Sidebar = () => {
	return (
		<aside className="sticky top-0 h-screen w-72 border-r border-border p-6 space-y-6">
			<section className="flex gap-2 ml-2">
				<div className="w-6 h-6 bg-foreground text-background rounded-lg flex justify-center items-center">
					<Zap size={12} fill="currentColor" />
				</div>
				<h2 className="font-medium">Opencircle</h2>
			</section>
			<section>
				<Input placeholder="Search" />
			</section>
			<nav className="space-y-2">
				<MenuItem icon={<Users size={20} />} label="Users" to="/users" />
				<MenuItem icon={<Hash size={20} />} label="Channels" to="/channels" />
				<MenuItem
					icon={<Key size={20} />}
					label="Invite Codes"
					to="/invite-codes"
				/>
				<MenuItem icon={<BookOpen size={20} />} label="Courses" to="/courses" />
				<MenuItem
					icon={<FileText size={20} />}
					label="Articles"
					to="/articles"
				/>
			</nav>
		</aside>
	);
};
