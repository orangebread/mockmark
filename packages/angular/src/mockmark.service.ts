import { Injectable, signal } from "@angular/core"
import type { MockMarkContextValue, MockMarkConfig, MockMarkTheme } from "@mockmark/core"
import { defaultTheme, mergeTheme } from "@mockmark/core"

/**
 * Service for global MockMark configuration.
 * Inject this service and call configure() to set global options.
 */
@Injectable({
    providedIn: "root",
})
export class MockMarkService {
    private readonly _config = signal<MockMarkContextValue>({
        enabled: true,
        defaultVariant: "border",
        theme: defaultTheme,
        tooltipTrigger: "hover",
    })

    /** Current configuration as a signal */
    readonly config = this._config.asReadonly()

    /** Get current configuration value */
    get value(): MockMarkContextValue {
        return this._config()
    }

    /**
     * Configure global MockMark settings
     */
    configure(config: MockMarkConfig): void {
        this._config.set({
            enabled: config.enabled ?? true,
            defaultVariant: config.defaultVariant ?? "border",
            theme: mergeTheme(config.theme),
            tooltipTrigger: config.tooltipTrigger ?? "hover",
        })
    }

    /**
     * Enable or disable MockMark globally
     */
    setEnabled(enabled: boolean): void {
        this._config.update((current) => ({ ...current, enabled }))
    }

    /**
     * Update theme
     */
    setTheme(theme: Partial<MockMarkTheme>): void {
        this._config.update((current) => ({
            ...current,
            theme: mergeTheme(theme),
        }))
    }
}
