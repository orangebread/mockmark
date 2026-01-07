"use client"

import * as React from "react"
import type { MockMarkContextValue } from "@mockmark/core"
import { defaultTheme } from "@mockmark/core"

const defaultConfig: MockMarkContextValue = {
    enabled: true,
    defaultVariant: "border",
    theme: defaultTheme,
    tooltipTrigger: "hover",
}

export const MockMarkContext = React.createContext<MockMarkContextValue>(defaultConfig)

/**
 * Hook to access MockMark configuration
 */
export function useMockMark(): MockMarkContextValue {
    return React.useContext(MockMarkContext)
}

export { defaultConfig }
