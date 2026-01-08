import { Injectable, signal } from "@angular/core"
import type { MockSeeContextValue, MockSeeConfig, MockSeeTheme } from "@mocksee/core"
import { defaultTheme, mergeTheme } from "@mocksee/core"

/**
 * Service for global MockSee configuration.
 * Inject this service and call configure() to set global options.
 */
@Injectable({
    providedIn: "root",
})
export class MockSeeService {
    private readonly _config = signal<MockSeeContextValue>({
        enabled: true,
        defaultVariant: "border",
        theme: defaultTheme,
        tooltipTrigger: "hover",
    })

    /** Current configuration as a signal */
    readonly config = this._config.asReadonly()

    /** Get current configuration value */
    get value(): MockSeeContextValue {
        return this._config()
    }

    /**
     * Configure global MockSee settings
     */
    configure(config: MockSeeConfig): void {
        this._config.set({
            enabled: config.enabled ?? true,
            defaultVariant: config.defaultVariant ?? "border",
            theme: mergeTheme(config.theme),
            tooltipTrigger: config.tooltipTrigger ?? "hover",
        })
    }

    /**
     * Enable or disable MockSee globally
     */
    setEnabled(enabled: boolean): void {
        this._config.update((current) => ({ ...current, enabled }))
    }

    /**
     * Update theme
     */
    setTheme(theme: Partial<MockSeeTheme>): void {
        this._config.update((current) => ({
            ...current,
            theme: mergeTheme(theme),
        }))
    }
}
