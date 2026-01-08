"use client"

import * as React from "react"
import { MockSeeContext } from "./context"
import type { MockSeeConfig } from "@mocksee/core"
import { mergeTheme } from "@mocksee/core"

interface MockSeeProviderProps extends MockSeeConfig {
    children: React.ReactNode
}

/**
 * Provider component for global MockSee configuration.
 * 
 * @example
 * ```tsx
 * <MockSeeProvider 
 *   enabled={process.env.NODE_ENV === 'development'}
 *   theme={{ borderColor: '#8b5cf6' }}
 *   tooltipTrigger="click"
 * >
 *   <App />
 * </MockSeeProvider>
 * ```
 */
export function MockSeeProvider({
    enabled = true,
    defaultVariant = "border",
    theme,
    tooltipTrigger = "hover",
    children,
}: MockSeeProviderProps) {
    const value = React.useMemo(
        () => ({
            enabled,
            defaultVariant,
            theme: mergeTheme(theme),
            tooltipTrigger,
        }),
        [enabled, defaultVariant, theme, tooltipTrigger]
    )

    return (
        <MockSeeContext.Provider value={value}>
            {children}
        </MockSeeContext.Provider>
    )
}
