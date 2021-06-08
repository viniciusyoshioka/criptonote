import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import styled from "styled-components/native"


const DebugButtonBase = styled(RectButton)`
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 50px;
    height: 50px;
    background-color: rgb(0, 0, 100);
`


const DebugButtonText = styled.Text`
    font-size: 13px;
    color: rgb(255, 255, 255);
`


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
