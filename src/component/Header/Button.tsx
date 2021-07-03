import React from "react"
import { RectButton, RectButtonProps } from "react-native-gesture-handler"
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { useTheme } from "../../service/theme"


export const HeaderButtonBase = styled(RectButton)`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 2px;
`


export interface HeaderButtonProps extends RectButtonProps {
    icon: string,
    iconSize?: number,
}


export function HeaderButton(props: HeaderButtonProps) {


    const { color, opacity } = useTheme()


    return (
        <HeaderButtonBase {...props}>
            <Icon
                name={props.icon}
                size={props.iconSize || 24}
                color={color.header_color}
                style={{
                    opacity: opacity.headerEmphasis
                }}
            />
        </HeaderButtonBase>
    )
}
