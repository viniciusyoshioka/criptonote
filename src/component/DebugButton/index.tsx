import React from "react"
import { StyleProp, ViewStyle } from "react-native"

import { DebugButtonBase, DebugButtonText } from "./style"


export interface DebugButtonProps {
    text: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
}


export function DebugButton(props: DebugButtonProps) {
    return (
        <DebugButtonBase style={props.style} onPress={props.onPress}>
            <DebugButtonText>
                {props.text}
            </DebugButtonText>
        </DebugButtonBase>
    )
}
