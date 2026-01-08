import type { MockSeeTheme, MockSeeColorOverrides } from "./types"

/**
 * Default theme values for MockSee
 */
export const defaultTheme: Required<MockSeeTheme> = {
    borderColor: "#f97316",
    labelBg: "#f97316",
    labelColor: "#ffffff",
    labelFontSize: "10px",
    tooltipBg: "rgba(15, 23, 42, 0.95)",
    tooltipColor: "#ffffff",
    tooltipFontSize: "12px",
}

/**
 * Merge user theme with defaults
 */
export function mergeTheme(theme?: Partial<MockSeeTheme>): Required<MockSeeTheme> {
    return { ...defaultTheme, ...theme }
}

/**
 * Apply per-instance color overrides to a resolved theme
 */
export function applyColorOverrides(
    theme: Required<MockSeeTheme>,
    overrides?: MockSeeColorOverrides
): Required<MockSeeTheme> {
    if (!overrides) return theme
    return {
        ...theme,
        ...(overrides.labelBg && { labelBg: overrides.labelBg }),
        ...(overrides.labelColor && { labelColor: overrides.labelColor }),
        ...(overrides.borderColor && { borderColor: overrides.borderColor }),
        ...(overrides.tooltipBg && { tooltipBg: overrides.tooltipBg }),
        ...(overrides.tooltipColor && { tooltipColor: overrides.tooltipColor }),
    }
}
