import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { RectButton, RectButtonProps } from "react-native-gesture-handler"
import styled from "styled-components/native"

import { styledProps, useTheme } from "../../service/theme"


const ShowPasswordButtonBase = styled(RectButton)`
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-left: 8px;
    border-radius: 2px;
    background-color: ${(props: styledProps) => props.theme.color.showPasswordButton_background};
`


export interface ShowPasswordButtonProps extends RectButtonProps {
    showPassword: boolean,
}


export function ShowPasswordButton(props: ShowPasswordButtonProps) {


    const { color, opacity } = useTheme()


    return (
        <ShowPasswordButtonBase {...props}>
            <Icon
                name={props.showPassword ? "md-eye" : "md-eye-off"}
                size={24}
                color={color.showPasswordButton_color}
                style={{
                    opacity: opacity.highEmphasis
                }}
            />
        </ShowPasswordButtonBase>
    )
}
