import { Link } from "@tanstack/react-router";

interface MentionMatch {
	text: string;
	username: string;
	isMention: boolean;
}

export const getShortenedName = (name: string): string => {
	const words = name.trim().split(/\s+/);
	let result: string;

	if (words.length === 1) {
		result = words[0];
	} else if (words.length === 2) {
		result = `${words[0]} ${words[1]}`;
	} else {
		// For names with 3+ words, return first two words
		result = `${words[0]} ${words[1]}`;
	}

	// Truncate if still too long (max 12 characters per name)
	if (result.length > 12) {
		return result.substring(0, 12) + "...";
	}

	return result;
};

export const formatCommentSummary = (names: string[]): string | null => {
	if (!names || names.length === 0) return null;

	const shortenedNames = names.map((name) => getShortenedName(name));

	if (shortenedNames.length === 1) {
		return `${shortenedNames[0]} commented`;
	}

	if (shortenedNames.length === 2) {
		return `${shortenedNames[0]} & ${shortenedNames[1]} commented`;
	}

	if (shortenedNames.length === 3) {
		return `${shortenedNames[0]}, ${shortenedNames[1]} and ${shortenedNames[2]} commented`;
	}

	// More than 3 names
	const visibleNames = shortenedNames.slice(0, 2);
	const remainingCount = names.length - 2;
	return `${visibleNames.join(", ")} and ${remainingCount} others commented`;
};

interface UrlMatch {
	text: string;
	url: string;
	isUrl: boolean;
}

type ContentMatch = MentionMatch | UrlMatch;

export const parseMentions = (content: string): MentionMatch[] => {
	const parts: MentionMatch[] = [];
	const mentionRegex = /@(\w+)/g;
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while (true) {
		match = mentionRegex.exec(content);
		if (match === null) break;
		// Add text before the mention
		if (match.index > lastIndex) {
			const textBefore = content.slice(lastIndex, match.index);
			if (textBefore) {
				parts.push({
					text: textBefore,
					username: "",
					isMention: false,
				});
			}
		}

		// Add the mention
		parts.push({
			text: match[0],
			username: match[1],
			isMention: true,
		});

		lastIndex = mentionRegex.lastIndex;
	}

	// Add remaining text after the last mention
	if (lastIndex < content.length) {
		const remainingText = content.slice(lastIndex);
		if (remainingText) {
			parts.push({
				text: remainingText,
				username: "",
				isMention: false,
			});
		}
	}

	return parts.length > 0
		? parts
		: [{ text: content, username: "", isMention: false }];
};

export const parseUrls = (content: string): UrlMatch[] => {
	const parts: UrlMatch[] = [];
	// URL regex pattern - matches http, https, and www URLs
	const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while (true) {
		match = urlRegex.exec(content);
		if (match === null) break;
		// Add text before the URL
		if (match.index > lastIndex) {
			const textBefore = content.slice(lastIndex, match.index);
			if (textBefore) {
				parts.push({
					text: textBefore,
					url: "",
					isUrl: false,
				});
			}
		}

		// Add the URL
		let url = match[0];
		// Add https:// if it starts with www.
		if (url.startsWith("www.")) {
			url = `https://${url}`;
		}

		parts.push({
			text: match[0],
			url: url,
			isUrl: true,
		});

		lastIndex = urlRegex.lastIndex;
	}

	// Add remaining text after the last URL
	if (lastIndex < content.length) {
		const remainingText = content.slice(lastIndex);
		if (remainingText) {
			parts.push({
				text: remainingText,
				url: "",
				isUrl: false,
			});
		}
	}

	return parts.length > 0 ? parts : [{ text: content, url: "", isUrl: false }];
};

export const extractMentions = (content: string): string[] => {
	const mentions: string[] = [];
	const regex = /@(\w+)/g;
	let match: RegExpExecArray | null;
	while (true) {
		match = regex.exec(content);
		if (match === null) break;
		mentions.push(match[1]);
	}
	return [...new Set(mentions)];
};

export const parseContent = (content: string): ContentMatch[] => {
	// First parse mentions
	const mentionParts = parseMentions(content);
	const allParts: ContentMatch[] = [];

	// Then parse URLs within each part
	for (const part of mentionParts) {
		if (part.isMention) {
			// If it's a mention, add it directly
			allParts.push(part);
		} else {
			// If it's text, parse URLs within it
			const urlParts = parseUrls(part.text);
			allParts.push(...urlParts);
		}
	}

	return allParts;
};

export const renderContent = (content: string) => {
	const parts = parseContent(content);

	return parts.map((part, index) => {
		const key = `part-${index}`;

		if ("isMention" in part && part.isMention) {
			return (
				<Link
					key={key}
					to="/$username"
					params={{ username: part.username }}
					className="text-indigo-400 font-medium hover:underline"
					onClick={(e) => e.stopPropagation()}
				>
					{part.text}
				</Link>
			);
		}

		if ("isUrl" in part && part.isUrl) {
			return (
				<a
					key={key}
					href={part.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:underline"
					onClick={(e) => e.stopPropagation()}
				>
					{part.text}
				</a>
			);
		}

		return <span key={key}>{part.text}</span>;
	});
};
