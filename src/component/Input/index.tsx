import React, { forwardRef, Ref, useState } from "react"
import { TextInput, TextInputProps } from "react-native"
import styled from "styled-components/native"

import { styledProps, useTheme } from "../../service/theme"


const InputBase = styled.TextInput`
    height: 48px;
    padding-vertical: 0px;
    padding-left: 16px;
    padding-right: 12px;
    font-size: 16.5px;
    border-radius: 2px;
    background-color: ${(props: styledProps) => props.theme.color.input_background};
    color: ${(props: styledProps) => props.theme.color.input_color};
    border-color: ${(props: styledProps & { isFocused?: boolean }) => {
        return props.isFocused ? props.theme.color.input_focus_border : props.theme.color.input_unfocus_border
    }};
    border-bottom-width: 2px;
`


export interface InputProps extends TextInputProps {
    isFocused?: boolean,
}


export const Input = forwardRef((props: InputProps, ref?: Ref<TextInput>) => {


    const { color } = useTheme()

    const [isFocused, setIsFocused] = useState(false)


    return (
        <InputBase
            blurOnSubmit={false}
            placeholderTextColor={color.input_placeholder}
            ref={ref}
            selectionColor={color.input_selection}
            onBlur={(e) => {
                if (props.isFocused === undefined) {
                    setIsFocused(false)
                }
                if (props.onBlur) {
                    props.onBlur(e)
                }
            }}
            onFocus={(e) => {
                if (props.isFocused === undefined) {
                    setIsFocused(true)
                }
                if (props.onFocus) {
                    props.onFocus(e)
                }
            }}
            isFocused={props.isFocused !== undefined ? props.isFocused : isFocused}
            {...props}
        />
    )
})
