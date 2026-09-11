"""Check the retro report structure, not the quality of its recommendations.

Usage: python3 check_report.py report.md [report.md ...]
"""
import re
import sys
from pathlib import Path


def check_report(text):
    # A quoted template is not a completed report.
    text = re.sub(r"^```[^\n]*\n.*?^```\s*$", "", text, flags=re.M | re.S)
    changes = re.search(r"^## Changes\s*\n(.*?)(?=^## |\Z)", text, re.M | re.S)
    if not changes:
        return ["Missing Changes section"]
    errors = []
    for title in ("Project changes", "Cross-session process changes"):
        section = re.search(
            rf"^### {re.escape(title)}\s*\n(.*?)(?=^### |\Z)",
            changes.group(1), re.M | re.S,
        )
        if not section or not section.group(1).strip():
            errors.append(f"Missing or empty {title} subsection")
    return errors


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    failed = False
    for argument in sys.argv[1:]:
        path = Path(argument)
        errors = check_report(path.read_text())
        failed |= bool(errors)
        print(f"{path}: {'; '.join(errors) if errors else 'PASS'}")
    sys.exit(int(failed))
