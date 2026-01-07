import { inject, provide, reactive, type InjectionKey } from "vue"
import type { MockMarkContextValue } from "@mockmark/core"
import { defaultTheme, mergeTheme } from "@mockmark/core"
import type { MockMarkConfig } from "@mockmark/core"

const defaultConfig: MockMarkContextValue = {
    enabled: true,
    defaultVariant: "border",
    theme: defaultTheme,
    tooltipTrigger: "hover",
}

export const MockMarkKey: InjectionKey<MockMarkContextValue> = Symbol("MockMark")

/**
 * Composable to access MockMark configuration
 */
export function useMockMark(): MockMarkContextValue {
    return inject(MockMarkKey, defaultConfig)
}

/**
 * Provide MockMark configuration to child components
 */
export function provideMockMark(config: MockMarkConfig = {}) {
    const value = reactive<MockMarkContextValue>({
        enabled: config.enabled ?? true,
        defaultVariant: config.defaultVariant ?? "border",
        theme: mergeTheme(config.theme),
        tooltipTrigger: config.tooltipTrigger ?? "hover",
    })
    provide(MockMarkKey, value)
    return value
}

export { defaultConfig }
