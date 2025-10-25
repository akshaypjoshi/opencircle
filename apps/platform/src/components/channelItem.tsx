import { Link } from "@tanstack/react-router";

interface ChannelItemProps {
	emoji: string;
	title: string;
	to?: string;
}

export const ChannelItem = ({ emoji, title, to }: ChannelItemProps) => {
	const content = (
		<div className="flex gap-3 items-center text-sm text-foreground/80 hover:text-foreground w-fit cursor-pointer transition duration-150">
			<div>{emoji}</div>
			<div>{title}</div>
		</div>
	);

	if (to) {
		return (
			<Link to={to} className="block">
				{content}
			</Link>
		);
	}

	return content;
};
