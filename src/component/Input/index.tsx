import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"
import styled from "styled-components/native"

import { styledProps, useTheme } from "../../service/theme"


export const InputBase = styled.TextInput`
    height: 48px;
    padding-vertical: 0px;
    padding-left: 16px;
    padding-right: 12px;
    font-size: 16.5px;
    border-radius: 2px;
    background-color: ${(props: styledProps) => props.theme.color.input_background};
    color: ${(props: styledProps) => props.theme.color.input_color};
    border-color: ${(props: styledProps) => props.theme.color.input_border};
`


export const Input = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {


    const { color } = useTheme()


    return (
        <InputBase
            blurOnSubmit={false}
            placeholderTextColor={props.placeholderTextColor || color.input_placeholder}
            ref={ref}
            {...props}
        />
    )
})
