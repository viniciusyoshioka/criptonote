import React from "react"
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RectButton } from "react-native-gesture-handler"

import { styledProps, useTheme } from "../../service/theme"


export const ButtonBase = styled(RectButton)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    min-width: 64px;
    height: 36px;
    border-radius: 2px;
    background-color: ${(props: styledProps) => props.theme.color.button_background};
`


export interface ButtonIconProps {
    icon: string,
}


export function ButtonIcon(props: ButtonIconProps) {


    const { color, opacity } = useTheme()


    return (
        <Icon
            name={props.icon}
            size={18}
            color={color.button_color}
            style={{
                marginRight: 8,
                opacity: opacity.highEmphasis,
            }}
        />
    )
}


export const ButtonTextContent = styled.Text`
    font-size: 15px;
    color: ${(props: styledProps) => props.theme.color.button_color};
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
`
