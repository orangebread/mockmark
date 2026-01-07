import * as React from "react"
import type { MockMarkVariant, MockMarkColorOverrides, TooltipFormat } from "@mockmark/core"

/**
 * Props for the MockMark component
 */
export interface MockMarkProps extends MockMarkColorOverrides {
    /** Label displayed on the indicator badge */
    label?: string
    /** Reason/description shown in tooltip */
    reason?: string
    /** Alias for reason - description shown in tooltip */
    description?: string
    /** Visual style variant */
    variant?: MockMarkVariant
    /** Force disable this specific indicator */
    disabled?: boolean
    /** Tooltip content format: "text" (default) or "markdown" */
    format?: TooltipFormat
    /** Children to wrap */
    children: React.ReactNode
    /** Additional CSS class name */
    className?: string
    /** Additional inline styles */
    style?: React.CSSProperties
}

