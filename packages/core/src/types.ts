/**
 * Visual style variants for MockMark
 */
export type MockMarkVariant = "border" | "badge" | "minimal"

/**
 * Tooltip trigger mode - hover shows on hover anywhere, click only triggers on label click
 */
export type TooltipTrigger = "hover" | "click"

/**
 * Theme configuration for MockMark styling
 */
export interface MockMarkTheme {
    /** Border color for the indicator */
    borderColor?: string
    /** Background color for the label badge */
    labelBg?: string
    /** Text color for the label */
    labelColor?: string
    /** Font size for the label */
    labelFontSize?: string
    /** Background color for the tooltip */
    tooltipBg?: string
    /** Text color for the tooltip */
    tooltipColor?: string
    /** Font size for the tooltip text */
    tooltipFontSize?: string
}

/**
 * Global configuration for MockMark provider
 */
export interface MockMarkConfig {
    /** Whether MockMark indicators are enabled (default: true in development) */
    enabled?: boolean
    /** Default visual variant */
    defaultVariant?: MockMarkVariant
    /** Theme customization */
    theme?: MockMarkTheme
    /** How to trigger tooltip: "hover" (default) or "click" (click only applies to label) */
    tooltipTrigger?: TooltipTrigger
}

/**
 * Context value type with required fields + defaults
 */
export interface MockMarkContextValue {
    enabled: boolean
    defaultVariant: MockMarkVariant
    theme: Required<MockMarkTheme>
    tooltipTrigger: TooltipTrigger
}

/**
 * Per-instance color overrides for MockMark component
 */
export interface MockMarkColorOverrides {
    /** Override label badge background color */
    labelBg?: string
    /** Override label badge text color */
    labelColor?: string
    /** Override border/outline color */
    borderColor?: string
    /** Override tooltip background color */
    tooltipBg?: string
    /** Override tooltip text color */
    tooltipColor?: string
}
