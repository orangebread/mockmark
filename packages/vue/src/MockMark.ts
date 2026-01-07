import {
    defineComponent,
    h,
    ref,
    computed,
    onMounted,
    onUnmounted,
    type PropType,
} from "vue"
import { useMockMark } from "./useConfig"
import type { MockMarkVariant, TooltipFormat } from "@mockmark/core"
import {
    mergeTheme,
    applyColorOverrides,
    getContainerStyles,
    getLabelStyles,
    getTooltipStyles,
    getArrowStyles,
    parseMarkdown,
} from "@mockmark/core"

export const MockMark = defineComponent({
    name: "MockMark",
    props: {
        label: {
            type: String,
            default: "MOCK",
        },
        reason: {
            type: String,
            default: undefined,
        },
        description: {
            type: String,
            default: undefined,
        },
        variant: {
            type: String as PropType<MockMarkVariant>,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String as PropType<TooltipFormat>,
            default: "text",
        },
        labelBg: {
            type: String,
            default: undefined,
        },
        labelColor: {
            type: String,
            default: undefined,
        },
        borderColor: {
            type: String,
            default: undefined,
        },
        tooltipBg: {
            type: String,
            default: undefined,
        },
        tooltipColor: {
            type: String,
            default: undefined,
        },
    },
    setup(props, { slots }) {
        const config = useMockMark()
        const tooltipVisible = ref(false)

        const resolvedVariant = computed(() => props.variant ?? config.defaultVariant)

        const theme = computed(() => {
            const baseTheme = mergeTheme(config.theme)
            return applyColorOverrides(baseTheme, {
                labelBg: props.labelBg,
                labelColor: props.labelColor,
                borderColor: props.borderColor,
                tooltipBg: props.tooltipBg,
                tooltipColor: props.tooltipColor,
            })
        })

        const tooltipText = computed(() => props.reason ?? props.description)
        const tooltipHtml = computed(() =>
            props.format === "markdown" && tooltipText.value
                ? parseMarkdown(tooltipText.value)
                : null
        )
        const isClickable = computed(
            () => config.tooltipTrigger === "click" && !!tooltipText.value
        )

        const containerStyle = computed(() =>
            getContainerStyles({
                variant: resolvedVariant.value,
                theme: theme.value,
            })
        )

        const labelStyle = computed(() =>
            getLabelStyles({
                variant: resolvedVariant.value,
                theme: theme.value,
                isClickable: isClickable.value,
            })
        )

        const tooltipStyle = computed(() =>
            getTooltipStyles({
                variant: resolvedVariant.value,
                theme: theme.value,
                visible: tooltipVisible.value,
            })
        )

        const arrowStyle = computed(() => getArrowStyles(theme.value))

        const handleLabelClick = (e: Event) => {
            if (isClickable.value) {
                e.stopPropagation()
                tooltipVisible.value = !tooltipVisible.value
            }
        }

        const handleMouseEnter = () => {
            if (config.tooltipTrigger === "hover" && tooltipText.value) {
                tooltipVisible.value = true
            }
        }

        const handleMouseLeave = () => {
            if (config.tooltipTrigger === "hover") {
                tooltipVisible.value = false
            }
        }

        const handleClickOutside = () => {
            tooltipVisible.value = false
        }

        onMounted(() => {
            if (config.tooltipTrigger === "click") {
                document.addEventListener("click", handleClickOutside)
            }
        })

        onUnmounted(() => {
            document.removeEventListener("click", handleClickOutside)
        })

        return () => {
            // Early return if disabled
            if (!config.enabled || props.disabled) {
                return slots.default?.()
            }

            // Tooltip content
            const tooltipContent = tooltipHtml.value
                ? h("div", { innerHTML: tooltipHtml.value })
                : tooltipText.value

            return h(
                "div",
                {
                    style: containerStyle.value,
                    onMouseenter: handleMouseEnter,
                    onMouseleave: handleMouseLeave,
                },
                [
                    // Label
                    h(
                        "div",
                        {
                            style: labelStyle.value,
                            onClick: handleLabelClick,
                            role: isClickable.value ? "button" : undefined,
                            tabindex: isClickable.value ? 0 : undefined,
                        },
                        props.label
                    ),
                    // Tooltip
                    tooltipText.value &&
                    h(
                        "div",
                        {
                            style: tooltipStyle.value,
                            role: "tooltip",
                            "aria-hidden": !tooltipVisible.value,
                        },
                        [
                            h("div", { style: arrowStyle.value }),
                            tooltipContent,
                        ]
                    ),
                    // Slot content
                    slots.default?.(),
                ]
            )
        }
    },
})

