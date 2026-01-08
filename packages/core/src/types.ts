/**
 * Visual style variants for MockSee
 */
export type MockSeeVariant = "border" | "badge" | "minimal"

/**
 * Tooltip trigger mode - hover shows on hover anywhere, click only triggers on label click
 */
export type TooltipTrigger = "hover" | "click"

/**
 * Theme configuration for MockSee styling
 */
export interface MockSeeTheme {
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
 * Global configuration for MockSee provider
 */
export interface MockSeeConfig {
    /** Whether MockSee indicators are enabled (default: true in development) */
    enabled?: boolean
    /** Default visual variant */
    defaultVariant?: MockSeeVariant
    /** Theme customization */
    theme?: MockSeeTheme
    /** How to trigger tooltip: "hover" (default) or "click" (click only applies to label) */
    tooltipTrigger?: TooltipTrigger
}

/**
 * Context value type with required fields + defaults
 */
export interface MockSeeContextValue {
    enabled: boolean
    defaultVariant: MockSeeVariant
    theme: Required<MockSeeTheme>
    tooltipTrigger: TooltipTrigger
}

/**
 * Per-instance color overrides for MockSee component
 */
export interface MockSeeColorOverrides {
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
