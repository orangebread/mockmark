import { defineComponent, type PropType } from "vue"
import { provideMockSee } from "./useConfig"
import type { MockSeeVariant, TooltipTrigger, MockSeeTheme } from "@mocksee/core"

export const MockSeeProvider = defineComponent({
    name: "MockSeeProvider",
    props: {
        enabled: {
            type: Boolean,
            default: true,
        },
        defaultVariant: {
            type: String as PropType<MockSeeVariant>,
            default: "border",
        },
        theme: {
            type: Object as PropType<Partial<MockSeeTheme>>,
            default: undefined,
        },
        tooltipTrigger: {
            type: String as PropType<TooltipTrigger>,
            default: "hover",
        },
    },
    setup(props, { slots }) {
        provideMockSee({
            enabled: props.enabled,
            defaultVariant: props.defaultVariant,
            theme: props.theme,
            tooltipTrigger: props.tooltipTrigger,
        })

        return () => slots.default?.()
    },
})
