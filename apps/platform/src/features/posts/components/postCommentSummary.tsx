interface PostCommentSummaryProps {
	names: string[];
}

export const PostCommentSummary = ({ names }: PostCommentSummaryProps) => {
	const formatCommentSummary = (names: string[]) => {
		if (!names || names.length === 0) return null;

		if (names.length === 1) {
			return `${names[0]} commented`;
		}

		if (names.length === 2) {
			return `${names[0]} & ${names[1]} commented`;
		}

		if (names.length === 3) {
			return `${names[0]}, ${names[1]} and ${names[2]} commented`;
		}

		// More than 3 names
		const visibleNames = names.slice(0, 2);
		const remainingCount = names.length - 2;
		return `${visibleNames.join(", ")} and ${remainingCount} others commented`;
	};

	const summary = formatCommentSummary(names);

	if (!summary) return null;

	return <div className="text-sm text-foreground/50">{summary}</div>;
};
