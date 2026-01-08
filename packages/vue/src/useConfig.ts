import { inject, provide, reactive, type InjectionKey } from "vue"
import type { MockSeeContextValue } from "@mocksee/core"
import { defaultTheme, mergeTheme } from "@mocksee/core"
import type { MockSeeConfig } from "@mocksee/core"

const defaultConfig: MockSeeContextValue = {
    enabled: true,
    defaultVariant: "border",
    theme: defaultTheme,
    tooltipTrigger: "hover",
}

export const MockSeeKey: InjectionKey<MockSeeContextValue> = Symbol("MockSee")

/**
 * Composable to access MockSee configuration
 */
export function useMockSee(): MockSeeContextValue {
    return inject(MockSeeKey, defaultConfig)
}

/**
 * Provide MockSee configuration to child components
 */
export function provideMockSee(config: MockSeeConfig = {}) {
    const value = reactive<MockSeeContextValue>({
        enabled: config.enabled ?? true,
        defaultVariant: config.defaultVariant ?? "border",
        theme: mergeTheme(config.theme),
        tooltipTrigger: config.tooltipTrigger ?? "hover",
    })
    provide(MockSeeKey, value)
    return value
}

export { defaultConfig }
