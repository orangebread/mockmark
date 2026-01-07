import {
    Component,
    Input,
    inject,
    signal,
    computed,
    HostListener,
    ChangeDetectionStrategy,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { MockMarkService } from "./mockmark.service"
import {
    mergeTheme,
    applyColorOverrides,
    getContainerStyles,
    getLabelStyles,
    getTooltipStyles,
    getArrowStyles,
    parseMarkdown,
} from "@mockmark/core"
import type { MockMarkVariant, TooltipFormat } from "@mockmark/core"

@Component({
    selector: "mock-mark",
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            [ngStyle]="shouldShowIndicator() ? containerStyle() : null"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
        >
            @if (shouldShowIndicator()) {
                <div
                    [ngStyle]="labelStyle()"
                    (click)="onLabelClick($event)"
                    [attr.role]="isClickable() ? 'button' : null"
                    [attr.tabindex]="isClickable() ? 0 : null"
                >
                    {{ label }}
                </div>
                @if (tooltipText()) {
                    <div
                        [ngStyle]="tooltipStyle()"
                        role="tooltip"
                        [attr.aria-hidden]="!tooltipVisible()"
                    >
                        <div [ngStyle]="arrowStyle()"></div>
                        @if (tooltipHtml()) {
                            <div [innerHTML]="tooltipHtml()"></div>
                        } @else {
                            {{ tooltipText() }}
                        }
                    </div>
                }
            }
            <ng-content></ng-content>
        </div>
    `,
})
export class MockMarkComponent {
    private readonly mockMarkService = inject(MockMarkService)

    @Input() label = "MOCK"
    @Input() reason?: string
    @Input() description?: string
    @Input() variant?: MockMarkVariant
    @Input() disabled = false
    @Input() format: TooltipFormat = "text"
    @Input() labelBg?: string
    @Input() labelColor?: string
    @Input() borderColor?: string
    @Input() tooltipBg?: string
    @Input() tooltipColor?: string

    protected readonly config = this.mockMarkService.config
    protected readonly tooltipVisible = signal(false)

    protected readonly resolvedVariant = computed(
        () => this.variant ?? this.config().defaultVariant
    )

    protected readonly shouldShowIndicator = computed(
        () => !this.disabled && this.config().enabled
    )

    protected readonly theme = computed(() => {
        const baseTheme = mergeTheme(this.config().theme)
        return applyColorOverrides(baseTheme, {
            labelBg: this.labelBg,
            labelColor: this.labelColor,
            borderColor: this.borderColor,
            tooltipBg: this.tooltipBg,
            tooltipColor: this.tooltipColor,
        })
    })

    protected readonly tooltipText = computed(() => this.reason ?? this.description)

    protected readonly tooltipHtml = computed(() =>
        this.format === "markdown" && this.tooltipText()
            ? parseMarkdown(this.tooltipText()!)
            : null
    )

    protected readonly isClickable = computed(
        () => this.config().tooltipTrigger === "click" && !!this.tooltipText()
    )

    protected readonly containerStyle = computed(() =>
        getContainerStyles({
            variant: this.resolvedVariant(),
            theme: this.theme(),
        })
    )

    protected readonly labelStyle = computed(() =>
        getLabelStyles({
            variant: this.resolvedVariant(),
            theme: this.theme(),
            isClickable: this.isClickable(),
        })
    )

    protected readonly tooltipStyle = computed(() =>
        getTooltipStyles({
            variant: this.resolvedVariant(),
            theme: this.theme(),
            visible: this.tooltipVisible(),
        })
    )

    protected readonly arrowStyle = computed(() => getArrowStyles(this.theme()))

    @HostListener("document:click")
    onDocumentClick(): void {
        if (this.config().tooltipTrigger === "click") {
            this.tooltipVisible.set(false)
        }
    }

    protected onMouseEnter(): void {
        if (this.config().tooltipTrigger === "hover" && this.tooltipText()) {
            this.tooltipVisible.set(true)
        }
    }

    protected onMouseLeave(): void {
        if (this.config().tooltipTrigger === "hover") {
            this.tooltipVisible.set(false)
        }
    }

    protected onLabelClick(event: Event): void {
        if (this.isClickable()) {
            event.stopPropagation()
            this.tooltipVisible.update((v) => !v)
        }
    }
}
