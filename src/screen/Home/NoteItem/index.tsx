import { Color, Prism } from "@elementium/color"
import CheckBox from "@react-native-community/checkbox"
import { useMemo } from "react"
import { LongPressGestureHandler } from "react-native-gesture-handler"
import { Text } from "react-native-paper"

import { NoteSchema } from "@database"
import { SelectableItem, useSelectableItem } from "@hooks"
import { DateService } from "@services/date"
import { useAppTheme } from "@theme"
import { NoteItemBlock, NoteItemButton } from "./style"


export { NOTE_ITEM_HEIGHT } from "./style"


export interface NoteItemProps extends SelectableItem {
    note: NoteSchema
}


export function NoteItem(props: NoteItemProps) {


    const { color, state } = useAppTheme()

    const { onPress, onLongPress } = useSelectableItem(props)


    const rippleColor = useMemo(() => {
        const backgroundColor = new Color(color.surface)
        const overlayColor = new Color(color.onSurface).setA(state.container.pressed)
        return Prism.addColors(backgroundColor, overlayColor).toRgba()
    }, [color.surface, color.onSurface, state.container.pressed])


    return (
        <LongPressGestureHandler
            maxDist={30}
            minDurationMs={400}
            onHandlerStateChange={({ nativeEvent }) => onLongPress(nativeEvent)}
        >
            <NoteItemButton onPress={onPress} android_ripple={{ color: rippleColor }}>
                <NoteItemBlock>
                    <Text
                        variant={"bodyLarge"}
                        numberOfLines={1}
                        style={{ color: color.onSurface }}
                        children={props.note.title}
                    />

                    <Text
                        variant={"bodySmall"}
                        numberOfLines={1}
                        style={{ color: color.onSurfaceVariant }}
                        children={DateService.getLocaleDateTime(new Date(props.note.modifiedAt), false)}
                    />
                </NoteItemBlock>

                {props.isSelectionMode && (
                    <CheckBox
                        value={props.isSelected}
                        onChange={onPress}
                        tintColors={{
                            true: color.primary,
                            false: color.onSurfaceVariant,
                        }}
                        style={{ marginLeft: 16 }}
                    />
                )}
            </NoteItemButton>
        </LongPressGestureHandler>
    )
}
