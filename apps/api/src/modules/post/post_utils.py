import re
from typing import List


def extract_mention(text: str) -> List[str]:
    """
    Extract usernames mentioned in text using @ symbol.

    Args:
        text: The text to extract mentions from

    Returns:
        List of usernames mentioned in the text
    """
    if not text:
        return []

    # Pattern to match @username where username contains word characters, underscores, and hyphens
    pattern = r"@(\w[\w-]*)"
    mentions = re.findall(pattern, text)

    return list(set(mentions))  # Remove duplicates
