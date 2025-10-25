import { Link } from "@tanstack/react-router";

interface MenuItemProps {
	icon: React.ReactNode;
	label: string;
	to?: string;
}

export const MenuItem = ({ icon, label, to }: MenuItemProps) => {
	const content = (
		<>
			{icon}
			<span className="ml-3">{label}</span>
		</>
	);

	if (to) {
		return (
			<Link
				to={to}
				className="flex text-sm items-center cursor-pointer hover:bg-primary rounded-lg p-2 transition duration-150"
			>
				{content}
			</Link>
		);
	}

	return (
		<div className="flex text-sm items-center cursor-pointer hover:bg-primary rounded-lg p-2 transition duration-150">
			{content}
		</div>
	);
};
