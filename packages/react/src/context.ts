"use client"

import * as React from "react"
import type { MockSeeContextValue } from "@mocksee/core"
import { defaultTheme } from "@mocksee/core"

const defaultConfig: MockSeeContextValue = {
    enabled: true,
    defaultVariant: "border",
    theme: defaultTheme,
    tooltipTrigger: "hover",
}

export const MockSeeContext = React.createContext<MockSeeContextValue>(defaultConfig)

/**
 * Hook to access MockSee configuration
 */
export function useMockSee(): MockSeeContextValue {
    return React.useContext(MockSeeContext)
}

export { defaultConfig }
