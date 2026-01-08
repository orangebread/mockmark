import type { MockSeeTheme, MockSeeVariant } from "./types"

export interface ContainerStyleOptions {
    variant: MockSeeVariant
    theme: Required<MockSeeTheme>
    baseStyle?: Record<string, unknown>
}

export interface LabelStyleOptions {
    variant: MockSeeVariant
    theme: Required<MockSeeTheme>
    isClickable: boolean
}

export interface TooltipStyleOptions {
    variant: MockSeeVariant
    theme: Required<MockSeeTheme>
    visible: boolean
}

/**
 * Generate container styles based on variant
 */
export function getContainerStyles(options: ContainerStyleOptions): Record<string, unknown> {
    const { variant, theme, baseStyle = {} } = options
    const base = {
        position: "relative",
        ...baseStyle,
    }

    switch (variant) {
        case "border":
            return {
                ...base,
                border: `2px dashed ${theme.borderColor}`,
                borderRadius: "8px",
                padding: "4px",
            }
        case "badge":
            return base
        case "minimal":
            return {
                ...base,
                outline: `1px dashed ${theme.borderColor}`,
                outlineOffset: "-1px",
            }
        default:
            return base
    }
}

/**
 * Generate label badge styles
 */
export function getLabelStyles(options: LabelStyleOptions): Record<string, unknown> {
    const { variant, theme, isClickable } = options
    return {
        position: "absolute",
        top: variant === "minimal" ? "0" : "-10px",
        left: variant === "minimal" ? "0" : "8px",
        backgroundColor: theme.labelBg,
        color: theme.labelColor,
        fontSize: theme.labelFontSize,
        fontWeight: 600,
        padding: variant === "minimal" ? "1px 4px" : "2px 6px",
        borderRadius: variant === "minimal" ? "0 0 4px 0" : "4px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        zIndex: 50,
        userSelect: "none",
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: 1.2,
        cursor: isClickable ? "pointer" : "default",
        pointerEvents: isClickable ? "auto" : "none",
    }
}

/**
 * Generate tooltip styles
 */
export function getTooltipStyles(options: TooltipStyleOptions): Record<string, unknown> {
    const { variant, theme, visible } = options
    return {
        position: "absolute",
        top: "100%",
        left: variant === "minimal" ? "0" : "8px",
        marginTop: "6px",
        backgroundColor: theme.tooltipBg,
        color: theme.tooltipColor,
        fontSize: theme.tooltipFontSize,
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "10px 14px",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transform: visible ? "translateY(0)" : "translateY(-4px)",
        transition: "opacity 150ms ease, transform 150ms ease, visibility 150ms",
        pointerEvents: "none",
        // Longform content support
        minWidth: "200px",
        maxWidth: "360px",
        maxHeight: "300px",
        overflowY: "auto",
        overflowX: "hidden",
        wordBreak: "break-word",
        lineHeight: 1.5,
    }
}

/**
 * Generate tooltip arrow styles
 */
export function getArrowStyles(theme: Required<MockSeeTheme>): Record<string, unknown> {
    return {
        position: "absolute",
        top: "-4px",
        left: "12px",
        width: "8px",
        height: "8px",
        backgroundColor: theme.tooltipBg,
        transform: "rotate(45deg)",
        borderTopLeftRadius: "2px",
    }
}
