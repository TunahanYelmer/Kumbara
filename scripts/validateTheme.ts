/**
 * Theme Validation Script
 *
 * Run this to check your theme colors for WCAG compliance
 * Usage: npx ts-node scripts/validateTheme.ts
 */

import { initialTheme, darkTheme } from '../context/theme/themeReducer';
import { validateThemeContrast } from '../utils/contrast';

console.log('🎨 WCAG Contrast Validation Report\n');
console.log('='.repeat(60));

// Validate Light Theme
console.log('\n📋 LIGHT THEME\n');
const lightValidation = validateThemeContrast(initialTheme);
console.log(lightValidation.summary);

if (lightValidation.issues.length > 0) {
  console.log('\n❌ CRITICAL ISSUES (Fail WCAG AA):');
  lightValidation.issues.forEach(issue => {
    console.log(`\n  ${issue.property}`);
    console.log(`  Text: ${issue.textColor} on Background: ${issue.bgColor}`);
    console.log(`  Contrast: ${issue.result.ratio}:1 (needs ${issue.result.required}:1)`);
    console.log(`  ${issue.description}`);
  });
}

if (lightValidation.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (Pass AA, but could improve to AAA):');
  lightValidation.warnings.forEach(warning => {
    console.log(`\n  ${warning.property}`);
    console.log(`  Contrast: ${warning.result.ratio}:1 (AAA needs 7:1)`);
  });
}

console.log('\n' + '='.repeat(60));

// Validate Dark Theme
console.log('\n🌙 DARK THEME\n');
const darkValidation = validateThemeContrast(darkTheme);
console.log(darkValidation.summary);

if (darkValidation.issues.length > 0) {
  console.log('\n❌ CRITICAL ISSUES (Fail WCAG AA):');
  darkValidation.issues.forEach(issue => {
    console.log(`\n  ${issue.property}`);
    console.log(`  Text: ${issue.textColor} on Background: ${issue.bgColor}`);
    console.log(`  Contrast: ${issue.result.ratio}:1 (needs ${issue.result.required}:1)`);
    console.log(`  ${issue.description}`);
  });
}

if (darkValidation.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (Pass AA, but could improve to AAA):');
  darkValidation.warnings.forEach(warning => {
    console.log(`\n  ${warning.property}`);
    console.log(`  Contrast: ${warning.result.ratio}:1 (AAA needs 7:1)`);
  });
}

console.log('\n' + '='.repeat(60));

// Overall Summary
const totalIssues = lightValidation.issues.length + darkValidation.issues.length;
const totalWarnings = lightValidation.warnings.length + darkValidation.warnings.length;

console.log('\n📊 OVERALL SUMMARY\n');
console.log(`  Critical Issues: ${totalIssues}`);
console.log(`  Warnings: ${totalWarnings}`);

if (totalIssues === 0) {
  console.log('\n  ✅ All themes pass WCAG AA standards!');
} else {
  console.log('\n  ❌ Please fix critical issues before release.');
}

console.log('\n' + '='.repeat(60) + '\n');
