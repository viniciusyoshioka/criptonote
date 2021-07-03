import React, { forwardRef, Ref, useState } from "react"
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
    elevation: 2;
    background-color: ${(props: styledProps) => props.theme.color.input_background};
    color: ${(props: styledProps) => props.theme.color.input_color};
    border-color: ${(props: styledProps) => props.theme.color.input_border};
    border-bottom-width: ${(props: styledProps & { isFocused: boolean }) => props.isFocused ? 2 : 0}px;
`


export const Input = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {


    const { color } = useTheme()

    const [isFocused, setIsFocused] = useState(false)


    return (
        <InputBase
            blurOnSubmit={false}
            placeholderTextColor={props.placeholderTextColor || color.input_placeholder}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            isFocused={isFocused}
            {...props}
        />
    )
})
