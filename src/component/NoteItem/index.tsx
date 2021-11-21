import React, { useCallback, useEffect, useState } from "react"
import { HandlerStateChangeEventPayload, LongPressGestureHandler, LongPressGestureHandlerEventPayload, State } from "react-native-gesture-handler"
import CheckBox from "@react-native-community/checkbox"

import { NoteForList } from "../../service/object-type"
import { useTheme } from "../../service/theme"
import { Block, Button, Date, Line, Title } from "./style"
import { toDateTime } from "../../service/date"


type longPressNativeEvent = Readonly<
    HandlerStateChangeEventPayload & LongPressGestureHandlerEventPayload
>


export interface NoteItemProps {
    click: () => void,
    select: () => void,
    deselect: () => void,
    selectionMode: boolean,
    noteForList: NoteForList,
}


export function NoteItem(props: NoteItemProps) {


    const { color, opacity } = useTheme()

    const [selected, setSelected] = useState(false)


    const normalPress = useCallback(() => {
        if (!props.selectionMode) {
            props.click()
        } else if (!selected) {
            props.select()
            setSelected(true)
        } else if (selected) {
            props.deselect()
            setSelected(false)
        }
    }, [props.selectionMode, selected, props.click])

    const longPress = useCallback((nativeEvent: longPressNativeEvent) => {
        if (nativeEvent.state === State.ACTIVE) {
            if (!props.selectionMode) {
                props.select()
                setSelected(true)
            }
        }
    }, [props.selectionMode])


    useEffect(() => {
        if (!props.selectionMode && selected) {
            setSelected(false)
        }
    }, [props.selectionMode])


    return (
        <LongPressGestureHandler
            maxDist={30}
            minDurationMs={400}
            onHandlerStateChange={({ nativeEvent }) => longPress(nativeEvent)}
        >
            <Button rippleColor={color.noteItem_ripple} onPress={normalPress}>
                <Block style={{ flex: 1 }}>
                    <Line>
                        <Title numberOfLines={1}>
                            {props.noteForList.title}
                        </Title>
                    </Line>

                    <Line>
                        <Date numberOfLines={1}>
                            {toDateTime(props.noteForList.timestamp)}
                        </Date>
                    </Line>
                </Block>

                {props.selectionMode && (
                    <Block style={{ paddingLeft: 10 }}>
                        <CheckBox
                            value={selected}
                            onChange={normalPress}
                            tintColors={{
                                true: color.noteItem_selected_background,
                                false: color.noteItem_selected_color
                            }}
                            style={{
                                opacity: opacity.highEmphasis
                            }}
                        />
                    </Block>
                )}
            </Button>
        </LongPressGestureHandler>
    )
}
