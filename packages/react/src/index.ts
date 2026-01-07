// Components
export { MockMark } from "./MockMark"
export { MockMarkProvider } from "./Provider"

// Context & hooks
export { useMockMark, MockMarkContext } from "./context"

// Types (re-export from core + React-specific)
export type { MockMarkProps } from "./types"
export type {
    MockMarkVariant,
    TooltipTrigger,
    MockMarkTheme,
    MockMarkConfig,
    MockMarkContextValue,
    MockMarkColorOverrides,
} from "@mockmark/core"
