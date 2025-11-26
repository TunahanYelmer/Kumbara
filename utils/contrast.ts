/**
 * WCAG Contrast Checker
 *
 * Implements WCAG 2.1 contrast ratio calculations to ensure
 * text and UI elements meet accessibility standards.
 *
 * Standards:
 * - AA Normal Text: 4.5:1
 * - AA Large Text: 3:1
 * - AAA Normal Text: 7:1
 * - AAA Large Text: 4.5:1
 */

/**
 * Calculate relative luminance of a color
 * Formula from: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getLuminance(hexColor: string): number {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Convert to RGB (0-255)
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Apply gamma correction (sRGB to linear RGB)
  const [rsRGB, gsRGB, bsRGB] = [r, g, b].map(val => {
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance using ITU-R BT.709 coefficients
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG compliance levels
 */
export type WCAGLevel = 'AA' | 'AAA';

/**
 * Result of a contrast check
 */
export interface ContrastCheckResult {
  ratio: number;
  passes: boolean;
  level: WCAGLevel;
  isLargeText: boolean;
  required: number;
  grade: 'AAA' | 'AA' | 'Fail';
}

/**
 * Check if contrast meets WCAG standards
 *
 * @param textColor - Foreground color (hex)
 * @param bgColor - Background color (hex)
 * @param level - WCAG level to check ('AA' or 'AAA')
 * @param isLargeText - Is this large text? (18pt+ or 14pt+ bold)
 */
export function meetsWCAG(
  textColor: string,
  bgColor: string,
  level: WCAGLevel = 'AA',
  isLargeText: boolean = false
): ContrastCheckResult {
  const ratio = getContrastRatio(textColor, bgColor);

  // WCAG 2.1 requirements
  const required = isLargeText
    ? (level === 'AA' ? 3 : 4.5)
    : (level === 'AA' ? 4.5 : 7);

  const passes = ratio >= required;

  // Determine grade
  let grade: 'AAA' | 'AA' | 'Fail';
  if (isLargeText) {
    grade = ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Fail';
  } else {
    grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail';
  }

  return {
    ratio: Math.round(ratio * 10) / 10,
    passes,
    level,
    isLargeText,
    required,
    grade
  };
}

/**
 * Get a human-readable description of the contrast result
 */
export function getContrastDescription(result: ContrastCheckResult): string {
  if (result.grade === 'AAA') {
    return '✅ Excellent - Passes WCAG AAA (Enhanced accessibility)';
  } else if (result.grade === 'AA') {
    return '✅ Good - Passes WCAG AA (Minimum standard)';
  } else {
    return `❌ Poor - Fails WCAG (needs ${result.required}:1, got ${result.ratio}:1)`;
  }
}

/**
 * Validate all text/background combinations in a theme
 */
export interface ThemeValidationIssue {
  property: string;
  textColor: string;
  bgColor: string;
  result: ContrastCheckResult;
  description: string;
}

/**
 * Comprehensive theme validation
 */
export function validateThemeContrast(theme: any): {
  valid: boolean;
  issues: ThemeValidationIssue[];
  warnings: ThemeValidationIssue[];
  summary: string;
} {
  const issues: ThemeValidationIssue[] = [];
  const warnings: ThemeValidationIssue[] = [];

  // Define critical color pairs to check
  const checks = [
    {
      property: 'Main Text',
      textColor: theme.TextColor,
      bgColor: theme.BackgroundColor,
    },
    {
      property: 'Balance Card Title',
      textColor: theme.BalanceCardTitleColor,
      bgColor: theme.BalanceCardColor[0],
    },
    {
      property: 'Balance Card Amount',
      textColor: theme.BalanceCardAmountColor,
      bgColor: theme.BalanceCardColor[0],
    },
    {
      property: 'Transaction Title',
      textColor: theme.TransactionTitleColor,
      bgColor: theme.BackgroundColor,
    },
    {
      property: 'Tab Active',
      textColor: theme.TabActiveColor,
      bgColor: theme.TabButtonBgColor,
    },
    {
      property: 'Tab Inactive',
      textColor: theme.TabButtonInactiveColour || theme.TabButtonInactiveColor,
      bgColor: theme.TabButtonBgColor,
    },
    {
      property: 'Settings Group Title',
      textColor: theme.SettingsGroupTitleColor,
      bgColor: theme.SettingsGroupBackgroundColor,
    },
    {
      property: 'Modal Title',
      textColor: theme.ModalTitleColor,
      bgColor: theme.ModalBGColor,
    },
    {
      property: 'Button Text',
      textColor: theme.ButtonTextColor,
      bgColor: theme.ButtonColor,
    },
  ];

  checks.forEach(check => {
    if (!check.textColor || !check.bgColor) return;

    const result = meetsWCAG(check.textColor, check.bgColor);
    const description = getContrastDescription(result);

    const issue: ThemeValidationIssue = {
      property: check.property,
      textColor: check.textColor,
      bgColor: check.bgColor,
      result,
      description,
    };

    if (result.grade === 'Fail') {
      issues.push(issue);
    } else if (result.grade === 'AA') {
      warnings.push(issue);
    }
  });

  const valid = issues.length === 0;
  const summary = valid
    ? `✅ All critical colors pass WCAG AA (${warnings.length} could be improved to AAA)`
    : `❌ Found ${issues.length} accessibility issues, ${warnings.length} warnings`;

  return { valid, issues, warnings, summary };
}
