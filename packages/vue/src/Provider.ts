import { defineComponent, type PropType } from "vue"
import { provideMockMark } from "./useConfig"
import type { MockMarkVariant, TooltipTrigger, MockMarkTheme } from "@mockmark/core"

export const MockMarkProvider = defineComponent({
    name: "MockMarkProvider",
    props: {
        enabled: {
            type: Boolean,
            default: true,
        },
        defaultVariant: {
            type: String as PropType<MockMarkVariant>,
            default: "border",
        },
        theme: {
            type: Object as PropType<Partial<MockMarkTheme>>,
            default: undefined,
        },
        tooltipTrigger: {
            type: String as PropType<TooltipTrigger>,
            default: "hover",
        },
    },
    setup(props, { slots }) {
        provideMockMark({
            enabled: props.enabled,
            defaultVariant: props.defaultVariant,
            theme: props.theme,
            tooltipTrigger: props.tooltipTrigger,
        })

        return () => slots.default?.()
    },
})
