// Components
export { MockSee } from "./MockSee"
export { MockSeeProvider } from "./Provider"

// Composables
export { useMockSee, provideMockSee, MockSeeKey } from "./useConfig"

// Types (re-export from core)
export type {
    MockSeeVariant,
    TooltipTrigger,
    MockSeeTheme,
    MockSeeConfig,
    MockSeeContextValue,
    MockSeeColorOverrides,
} from "@mocksee/core"
