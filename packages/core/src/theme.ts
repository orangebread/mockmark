import type { MockMarkTheme, MockMarkColorOverrides } from "./types"

/**
 * Default theme values for MockMark
 */
export const defaultTheme: Required<MockMarkTheme> = {
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
export function mergeTheme(theme?: Partial<MockMarkTheme>): Required<MockMarkTheme> {
    return { ...defaultTheme, ...theme }
}

/**
 * Apply per-instance color overrides to a resolved theme
 */
export function applyColorOverrides(
    theme: Required<MockMarkTheme>,
    overrides?: MockMarkColorOverrides
): Required<MockMarkTheme> {
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
