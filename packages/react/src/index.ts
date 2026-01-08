// Components
export { MockSee } from "./MockSee"
export { MockSeeProvider } from "./Provider"

// Context & hooks
export { useMockSee, MockSeeContext } from "./context"

// Types (re-export from core + React-specific)
export type { MockSeeProps } from "./types"
export type {
    MockSeeVariant,
    TooltipTrigger,
    MockSeeTheme,
    MockSeeConfig,
    MockSeeContextValue,
    MockSeeColorOverrides,
} from "@mocksee/core"
