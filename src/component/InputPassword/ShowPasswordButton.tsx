import React from "react"
import { TouchableOpacityProps } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import styled from "styled-components/native"

import { styledProps, useTheme } from "../../service/theme"


const ShowPasswordButtonBase = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 2px;
    border-bottom-width: 2px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    background-color: ${(props: styledProps) => props.theme.color.input_background};
    border-color: ${(props: styledProps & { isFocused: boolean }) => {
        return props.isFocused ? props.theme.color.input_focus_border : props.theme.color.input_background
    }};
`


export interface ShowPasswordButtonProps extends TouchableOpacityProps {
    showPassword: boolean,
    isFocused: boolean,
}


export function ShowPasswordButton(props: ShowPasswordButtonProps) {


    const { color, opacity } = useTheme()


    return (
        <ShowPasswordButtonBase activeOpacity={0.7} {...props}>
            <Icon
                name={props.showPassword ? "visibility" : "visibility-off"}
                size={24}
                color={color.showPasswordButton_color}
                style={{
                    opacity: opacity.highEmphasis
                }}
            />
        </ShowPasswordButtonBase>
    )
}
