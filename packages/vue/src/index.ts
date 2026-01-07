// Components
export { MockMark } from "./MockMark"
export { MockMarkProvider } from "./Provider"

// Composables
export { useMockMark, provideMockMark, MockMarkKey } from "./useConfig"

// Types (re-export from core)
export type {
    MockMarkVariant,
    TooltipTrigger,
    MockMarkTheme,
    MockMarkConfig,
    MockMarkContextValue,
    MockMarkColorOverrides,
} from "@mockmark/core"
