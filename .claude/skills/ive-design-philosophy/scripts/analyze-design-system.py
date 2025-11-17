#!/usr/bin/env python3
"""
Jony Ive Design Philosophy Analyzer

This script analyzes design systems (CSS, Tailwind config, design tokens) against
Jony Ive's core design principles and generates a compliance report.

Usage:
    python analyze-design-system.py <path-to-css-or-config> --output report.md

Principles Evaluated:
1. Simplicity (color palette complexity, component variety)
2. Material Authenticity (consistent design tokens)
3. Attention to Detail (spacing consistency, typography scale)
4. Less, But Better (unnecessary decoration, bloat)

Author: Generated for Prismatica Labs
License: MIT
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Set
from collections import Counter


class IveDesignAnalyzer:
    """Analyzes design systems against Jony Ive's design principles."""

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        self.content = self._load_file()
        self.colors = []
        self.font_sizes = []
        self.spacing_values = []
        self.font_weights = []
        self.issues = []
        self.recommendations = []

    def _load_file(self) -> str:
        """Load and return file contents."""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"Error loading file: {e}", file=sys.stderr)
            sys.exit(1)

    def analyze(self) -> Dict:
        """Run all analyses and return results."""
        print(f"Analyzing {self.file_path.name}...")

        # Detect file type and parse accordingly
        if self.file_path.suffix == '.json':
            self._analyze_json_config()
        elif self.file_path.suffix in ['.css', '.scss']:
            self._analyze_css()
        elif self.file_path.name == 'tailwind.config.js':
            self._analyze_tailwind_config()
        else:
            self._analyze_generic()

        # Run principle-based evaluations
        self._evaluate_simplicity()
        self._evaluate_material_authenticity()
        self._evaluate_attention_to_detail()
        self._evaluate_less_but_better()

        return {
            'file': str(self.file_path),
            'colors': self.colors,
            'font_sizes': self.font_sizes,
            'spacing_values': self.spacing_values,
            'font_weights': self.font_weights,
            'issues': self.issues,
            'recommendations': self.recommendations
        }

    def _analyze_json_config(self):
        """Analyze JSON design token files."""
        try:
            data = json.loads(self.content)

            # Extract colors
            if 'colors' in data:
                self.colors = self._flatten_colors(data['colors'])

            # Extract spacing
            if 'spacing' in data:
                self.spacing_values = list(data['spacing'].values())

            # Extract typography
            if 'fontSize' in data:
                self.font_sizes = list(data['fontSize'].values())
            if 'fontWeight' in data:
                self.font_weights = list(data['fontWeight'].values())

        except json.JSONDecodeError as e:
            self.issues.append(f"JSON parsing error: {e}")

    def _analyze_css(self):
        """Analyze CSS/SCSS files."""
        # Extract colors (hex, rgb, hsl)
        hex_colors = re.findall(r'#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b', self.content)
        rgb_colors = re.findall(r'rgb\([^)]+\)', self.content)
        hsl_colors = re.findall(r'hsl\([^)]+\)', self.content)

        self.colors = [f"#{c}" for c in hex_colors] + rgb_colors + hsl_colors

        # Extract font sizes
        font_sizes = re.findall(r'font-size:\s*([0-9.]+(?:px|rem|em))', self.content)
        self.font_sizes = font_sizes

        # Extract spacing (margin, padding)
        spacing = re.findall(r'(?:margin|padding)(?:-(?:top|right|bottom|left))?:\s*([0-9.]+(?:px|rem|em))', self.content)
        self.spacing_values = spacing

        # Extract font weights
        font_weights = re.findall(r'font-weight:\s*([0-9]+|normal|bold|lighter|bolder)', self.content)
        self.font_weights = font_weights

    def _analyze_tailwind_config(self):
        """Analyze Tailwind config files."""
        # Extract theme configuration from JS file
        # This is a simplified parser - real implementation would need proper JS parsing

        # Colors
        color_matches = re.findall(r"'([^']*)':\s*'(#[A-Fa-f0-9]{6})'", self.content)
        self.colors = [color[1] for color in color_matches]

        # Spacing
        spacing_matches = re.findall(r"'(\d+)':\s*'([^']+)'", self.content)
        self.spacing_values = [s[1] for s in spacing_matches if 'px' in s[1] or 'rem' in s[1]]

    def _analyze_generic(self):
        """Generic analysis for unknown file types."""
        self._analyze_css()  # Try CSS patterns

    def _flatten_colors(self, colors_dict: Dict, prefix='') -> List[str]:
        """Recursively flatten nested color dictionaries."""
        result = []
        for key, value in colors_dict.items():
            if isinstance(value, dict):
                result.extend(self._flatten_colors(value, f"{prefix}{key}."))
            else:
                result.append(value)
        return result

    def _evaluate_simplicity(self):
        """Evaluate color palette complexity against Ive's minimalism."""
        unique_colors = set(self.colors)
        color_count = len(unique_colors)

        if color_count == 0:
            return

        # Ive's ideal: 1-2 primary colors + grayscale + semantic colors (success, error, warning)
        # Acceptable: ~8-12 total colors
        # Excessive: 15+ colors

        if color_count > 15:
            self.issues.append(
                f"Color Palette Complexity: {color_count} unique colors detected. "
                "Ive's philosophy: 'Less, but better.' Reduce to ~8-12 colors maximum."
            )
            self.recommendations.append(
                "Simplify color palette:\n"
                "  - 1 primary brand color\n"
                "  - Grayscale (3-5 shades: white, light gray, medium gray, dark gray, black)\n"
                "  - Semantic colors (success/green, error/red, warning/yellow)\n"
                "  - Optional: 1 accent color\n"
                "  Eliminate decorative color variations."
            )
        elif color_count > 12:
            self.issues.append(
                f"Color Palette: {color_count} colors. Consider reducing to 8-12 for greater simplicity."
            )

    def _evaluate_material_authenticity(self):
        """Evaluate consistency in design token usage."""
        # Check for arbitrary values (indicates inconsistent design system)
        arbitrary_spacing = [s for s in self.spacing_values if not self._is_scale_value(s)]

        if len(arbitrary_spacing) > len(self.spacing_values) * 0.3:  # More than 30% arbitrary
            self.issues.append(
                f"Material Authenticity: {len(arbitrary_spacing)} arbitrary spacing values detected. "
                "Ive's principle: Consistent design tokens create authentic, harmonious interfaces."
            )
            self.recommendations.append(
                "Establish consistent spacing scale:\n"
                "  - Use multiples of 4 or 8 (e.g., 4, 8, 12, 16, 24, 32, 48, 64)\n"
                "  - Replace arbitrary values with scale values\n"
                "  - Apply scale consistently across all components"
            )

    def _evaluate_attention_to_detail(self):
        """Evaluate typography and spacing detail consistency."""
        # Typography scale analysis
        if self.font_sizes:
            unique_sizes = set(self.font_sizes)
            if len(unique_sizes) > 8:
                self.issues.append(
                    f"Typography Scale: {len(unique_sizes)} different font sizes detected. "
                    "Ive's obsession with detail requires harmonious, limited type scale (5-7 sizes ideal)."
                )
                self.recommendations.append(
                    "Simplify typography scale:\n"
                    "  - Use modular scale (e.g., 1.25 or 1.333 ratio)\n"
                    "  - Limit to 5-7 sizes: xs, sm, base, lg, xl, 2xl, 3xl\n"
                    "  - Remove arbitrary size variations"
                )

        # Font weight analysis
        if self.font_weights:
            weight_counter = Counter(self.font_weights)
            if len(weight_counter) > 4:
                self.issues.append(
                    f"Font Weight Variety: {len(weight_counter)} different font weights. "
                    "Limit to 2-3 weights (e.g., 400/normal, 500/medium, 700/bold)."
                )

    def _evaluate_less_but_better(self):
        """Evaluate overall minimalism and necessity."""
        total_tokens = len(self.colors) + len(self.font_sizes) + len(self.spacing_values)

        if total_tokens == 0:
            return

        # Check for potential bloat
        if total_tokens > 100:
            self.issues.append(
                f"Design System Complexity: {total_tokens} total design tokens. "
                "Ive's 'Less, but better' principle suggests ruthless reduction. "
                "Question every token: Does it serve the user's goal?"
            )
            self.recommendations.append(
                "Apply 'Less, but better' principle:\n"
                "  1. List all design tokens\n"
                "  2. For each token, ask: 'Is this essential?'\n"
                "  3. Consolidate similar values\n"
                "  4. Remove decorative variations\n"
                "  5. Default to showing less, revealing more on demand"
            )

    def _is_scale_value(self, value: str) -> bool:
        """Check if a value follows a consistent scale (multiples of 4 or 8)."""
        # Extract numeric value
        match = re.match(r'([0-9.]+)', value)
        if not match:
            return False

        try:
            num = float(match.group(1))
            # Check if divisible by 4 or 8 (with small tolerance for rem/em conversions)
            return (num % 4 < 0.5) or (num % 8 < 0.5)
        except ValueError:
            return False

    def generate_report(self, output_path: str = None) -> str:
        """Generate markdown report of analysis."""
        report_lines = [
            "# Jony Ive Design Philosophy Analysis Report",
            "",
            f"**Analyzed File:** `{self.file_path.name}`",
            f"**Analysis Date:** {Path(__file__).stat().st_mtime}",
            "",
            "---",
            "",
            "## Executive Summary",
            "",
        ]

        if not self.issues:
            report_lines.extend([
                "✅ **Excellent alignment with Jony Ive's design principles.**",
                "",
                "Your design system demonstrates:",
                "- Simplicity and clarity in design tokens",
                "- Material authenticity through consistent patterns",
                "- Attention to detail in typography and spacing",
                "- 'Less, but better' philosophy in overall complexity",
                ""
            ])
        else:
            report_lines.extend([
                f"⚠️  **{len(self.issues)} issues identified** requiring attention to align with Ive's philosophy.",
                ""
            ])

        # Metrics summary
        report_lines.extend([
            "## Design System Metrics",
            "",
            f"- **Colors:** {len(set(self.colors))} unique colors",
            f"- **Font Sizes:** {len(set(self.font_sizes))} unique sizes",
            f"- **Spacing Values:** {len(set(self.spacing_values))} unique values",
            f"- **Font Weights:** {len(set(self.font_weights))} unique weights",
            "",
            "---",
            ""
        ])

        # Issues
        if self.issues:
            report_lines.extend([
                "## Issues Identified",
                ""
            ])
            for i, issue in enumerate(self.issues, 1):
                report_lines.append(f"### {i}. {issue.split(':')[0]}")
                report_lines.append("")
                report_lines.append(issue)
                report_lines.append("")

        # Recommendations
        if self.recommendations:
            report_lines.extend([
                "---",
                "",
                "## Recommendations",
                "",
                "To align your design system with Jony Ive's philosophy:",
                ""
            ])
            for i, rec in enumerate(self.recommendations, 1):
                report_lines.append(f"### {i}. {rec.split(':')[0] if ':' in rec else 'Improvement'}")
                report_lines.append("")
                report_lines.append(rec)
                report_lines.append("")

        # Core principles reminder
        report_lines.extend([
            "---",
            "",
            "## Jony Ive's Core Principles",
            "",
            "**Remember:**",
            "",
            '1. **Simplicity as Complexity Resolved:** "True simplicity is derived from bringing order to complexity."',
            '2. **Care and Craftsmanship:** "The most important thing is that you care."',
            '3. **Material Authenticity:** "Form and the material and process are beautifully intertwined."',
            '4. **User-Centric Design:** "The defining qualities are about use: ease and simplicity."',
            '5. **Attention to Detail:** "Ease and simplicity of use are achieved by obsessing with details."',
            '6. **Less, But Better:** "Minimalism is about clarity, about revealing what\'s essential and true."',
            "",
            "---",
            "",
            "## Next Steps",
            "",
            "1. Review each identified issue",
            "2. Prioritize changes (High → Medium → Low)",
            "3. Implement recommendations systematically",
            "4. Re-run analysis to verify improvements",
            "5. Iterate until design system achieves Ive-level simplicity",
            "",
            '**Quote to guide your work:**',
            "",
            '> "We don\'t arbitrarily create form."',
            "> — Jony Ive",
            "",
            "Every design token should have clear purpose. Question everything that doesn't serve the user.",
            ""
        ])

        report = "\n".join(report_lines)

        # Write to file if output path provided
        if output_path:
            try:
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(report)
                print(f"✅ Report written to: {output_path}")
            except Exception as e:
                print(f"Error writing report: {e}", file=sys.stderr)

        return report


def main():
    """Main entry point for CLI usage."""
    parser = argparse.ArgumentParser(
        description="Analyze design systems against Jony Ive's design principles",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python analyze-design-system.py styles.css
  python analyze-design-system.py tailwind.config.js --output report.md
  python analyze-design-system.py design-tokens.json --output analysis.md

Principles Evaluated:
  1. Simplicity (color palette, component variety)
  2. Material Authenticity (consistent design tokens)
  3. Attention to Detail (typography, spacing consistency)
  4. Less, But Better (unnecessary decoration, bloat)
        """
    )

    parser.add_argument(
        'file',
        help='Path to CSS, config, or design token file to analyze'
    )

    parser.add_argument(
        '--output', '-o',
        help='Output path for markdown report (prints to stdout if not specified)',
        default=None
    )

    args = parser.parse_args()

    # Run analysis
    analyzer = IveDesignAnalyzer(args.file)
    results = analyzer.analyze()

    # Generate and output report
    report = analyzer.generate_report(args.output)

    if not args.output:
        print(report)

    # Exit with appropriate code
    sys.exit(0 if not results['issues'] else 1)


if __name__ == '__main__':
    main()
