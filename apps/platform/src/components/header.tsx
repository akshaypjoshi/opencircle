import { useRouter } from "@tanstack/react-router";

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	const router = useRouter();

	if (label === "Back") {
		return (
			<div className="sticky top-0 z-10 bg-background h-14 flex flex-col justify-center px-4 border-b border-border font-medium text-sm">
				<button
					type="button"
					onClick={() => router.history.back()}
					className="text-left"
				>
					Back
				</button>
			</div>
		);
	}

	return (
		<div className="sticky top-0 z-10 bg-background h-14 flex flex-col justify-center px-4 border-b border-border font-medium text-sm">
			{label}
		</div>
	);
};
