import { Color, Prism } from "@elementium/color"
import CheckBox from "@react-native-community/checkbox"
import { useMemo } from "react"
import { Pressable, View } from "react-native"
import { LongPressGestureHandler } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import { useStyles } from "react-native-unistyles"

import { NoteSchema } from "@database"
import { SelectableItem, useSelectableItem } from "@hooks"
import { DateService } from "@services/date"
import { stylesheet } from "./style"


export { NOTE_ITEM_HEIGHT } from "./style"


export interface NoteItemProps extends SelectableItem {
    note: NoteSchema
}


export function NoteItem(props: NoteItemProps) {


    const { styles, theme } = useStyles(stylesheet)
    const { colors, state } = theme
    const { onPress, onLongPress } = useSelectableItem(props)


    const rippleColor = useMemo(() => {
        const backgroundColor = new Color(colors.surface)
        const overlayColor = new Color(colors.onSurface).setA(state.container.pressed)
        return Prism.addColors(backgroundColor, overlayColor).toRgba()
    }, [colors.surface, colors.onSurface, state.container.pressed])


    return (
        <LongPressGestureHandler
            maxDist={30}
            minDurationMs={400}
            onHandlerStateChange={({ nativeEvent }) => onLongPress(nativeEvent)}
        >
            <Pressable
                style={styles.button}
                onPress={onPress}
                android_ripple={{ color: rippleColor }}
            >
                <View style={styles.block}>
                    <Text
                        variant={"bodyLarge"}
                        numberOfLines={1}
                        style={{ color: colors.onSurface }}
                        children={props.note.title}
                    />

                    <Text
                        variant={"bodySmall"}
                        numberOfLines={1}
                        style={{ color: colors.onSurfaceVariant }}
                        children={DateService.getLocaleDateTime(new Date(props.note.modifiedAt), false)}
                    />
                </View>

                {props.isSelectionMode && (
                    <CheckBox
                        value={props.isSelected}
                        onChange={onPress}
                        tintColors={{
                            true: colors.primary,
                            false: colors.onSurfaceVariant,
                        }}
                        style={{ marginLeft: 16 }}
                    />
                )}
            </Pressable>
        </LongPressGestureHandler>
    )
}
