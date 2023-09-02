import { Color, Prisma } from "@elementium/color"
import { Text } from "@elementium/native"
import CheckBox from "@react-native-community/checkbox"
import { useMemo } from "react"
import { LongPressGestureHandler } from "react-native-gesture-handler"

import { NoteSchema } from "@database"
import { SelectableItem, useSelectableItem } from "@hooks"
import { DateService } from "@services/date"
import { useAppTheme } from "@theme"
import { NoteItemBlock, NoteItemButton } from "./style"


export { NOTE_ITEM_HEIGHT } from "./style"


export interface NoteItemProps extends SelectableItem {
    note: NoteSchema;
}


export function NoteItem(props: NoteItemProps) {


    const { color, state } = useAppTheme()

    const { onPress, onLongPress } = useSelectableItem(props)


    const rippleColor = useMemo(() => {
        const backgroundColor = new Color(color.surface)
        const overlayColor = new Color(color.onSurface).setA(state.container.pressed)
        return Prisma.addColors(backgroundColor, overlayColor).toRgba()
    }, [color.surface, color.onSurface, state.container.pressed])


    return (
        <LongPressGestureHandler
            maxDist={30}
            minDurationMs={400}
            onHandlerStateChange={({ nativeEvent }) => onLongPress(nativeEvent)}
        >
            <NoteItemButton onPress={onPress} rippleColor={rippleColor}>
                <NoteItemBlock>
                    <Text
                        variant={"body"}
                        size={"large"}
                        numberOfLines={1}
                        style={{ color: color.onSurface }}
                        children={props.note.title}
                    />

                    <Text
                        variant={"body"}
                        size={"small"}
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