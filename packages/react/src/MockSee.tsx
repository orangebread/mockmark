"use client"

import * as React from "react"
import { useMockSee } from "./context"
import type { MockSeeProps } from "./types"
import {
    mergeTheme,
    applyColorOverrides,
    getContainerStyles,
    getLabelStyles,
    getTooltipStyles,
    getArrowStyles,
    parseMarkdown,
} from "@mocksee/core"

/**
 * Development-only visual indicator for components using mock data.
 * 
 * Wraps children with a visual indicator (border, badge, or minimal)
 * to highlight that the content is using mock/placeholder data.
 * 
 * In production, this component is a no-op and returns children directly
 * when the provider's `enabled` prop is false.
 * 
 * @example
 * ```tsx
 * <MockSee label="API Data" reason="Not connected to backend">
 *   <UserList users={mockUsers} />
 * </MockSee>
 * ```
 */
export function MockSee({
    label = "MOCK",
    reason,
    description,
    variant,
    disabled = false,
    format = "text",
    children,
    className,
    style,
    labelBg,
    labelColor,
    borderColor,
    tooltipBg,
    tooltipColor,
}: MockSeeProps) {
    const config = useMockSee()
    const resolvedVariant = variant ?? config.defaultVariant

    // Merge global theme with per-instance overrides
    const baseTheme = mergeTheme(config.theme)
    const theme = applyColorOverrides(baseTheme, {
        labelBg,
        labelColor,
        borderColor,
        tooltipBg,
        tooltipColor,
    })

    const tooltipText = reason ?? description
    const [tooltipVisible, setTooltipVisible] = React.useState(false)

    // Early return if disabled globally or locally
    if (!config.enabled || disabled) {
        return <>{children}</>
    }

    const isClickable = config.tooltipTrigger === "click" && !!tooltipText

    const containerStyle = getContainerStyles({
        variant: resolvedVariant,
        theme,
        baseStyle: style as Record<string, unknown>,
    }) as React.CSSProperties

    const labelStyle = getLabelStyles({
        variant: resolvedVariant,
        theme,
        isClickable,
    }) as React.CSSProperties

    const tooltipStyle = getTooltipStyles({
        variant: resolvedVariant,
        theme,
        visible: tooltipVisible,
    }) as React.CSSProperties

    const arrowStyle = getArrowStyles(theme) as React.CSSProperties

    const handleLabelClick = (e: React.MouseEvent) => {
        if (isClickable) {
            e.stopPropagation()
            setTooltipVisible(!tooltipVisible)
        }
    }

    // For hover mode, handle mouse events on the entire container
    const containerHoverHandlers = config.tooltipTrigger === "hover" && tooltipText
        ? {
            onMouseEnter: () => setTooltipVisible(true),
            onMouseLeave: () => setTooltipVisible(false),
        }
        : {}

    // Close tooltip when clicking outside (for click mode)
    React.useEffect(() => {
        if (config.tooltipTrigger === "click" && tooltipVisible) {
            const handleClickOutside = () => setTooltipVisible(false)
            // Delay to prevent immediate close on the same click
            const timer = setTimeout(() => {
                document.addEventListener("click", handleClickOutside)
            }, 0)
            return () => {
                clearTimeout(timer)
                document.removeEventListener("click", handleClickOutside)
            }
        }
    }, [config.tooltipTrigger, tooltipVisible])

    return (
        <div
            className={className}
            style={containerStyle}
            {...containerHoverHandlers}
        >
            <div
                style={labelStyle}
                onClick={handleLabelClick}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                    if (isClickable && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault()
                        setTooltipVisible(!tooltipVisible)
                    }
                }}
            >
                {label}
            </div>
            {/* Custom tooltip */}
            {tooltipText && (
                <div style={tooltipStyle} role="tooltip" aria-hidden={!tooltipVisible}>
                    <div style={arrowStyle} />
                    {format === "markdown" ? (
                        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(tooltipText) }} />
                    ) : (
                        tooltipText
                    )}
                </div>
            )}
            {children}
        </div>
    )
}
