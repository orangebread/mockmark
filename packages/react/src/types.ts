import * as React from "react"
import type { MockSeeVariant, MockSeeColorOverrides, TooltipFormat } from "@mocksee/core"

/**
 * Props for the MockSee component
 */
export interface MockSeeProps extends MockSeeColorOverrides {
    /** Label displayed on the indicator badge */
    label?: string
    /** Reason/description shown in tooltip */
    reason?: string
    /** Alias for reason - description shown in tooltip */
    description?: string
    /** Visual style variant */
    variant?: MockSeeVariant
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
