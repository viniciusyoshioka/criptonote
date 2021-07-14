import React, { forwardRef, Ref, useState } from "react"
import { TextInput, TextInputProps } from "react-native"

import { useTheme } from "../../service/theme"
import { Input } from "../Input"


export const InputText = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {


    const { color } = useTheme()

    const [isFocused, setIsFocused] = useState(false)


    return (
        <Input
            ref={ref}
            multiline={true}
            placeholder={"Texto"}
            returnKeyType={"done"}
            onBlur={(e) => {
                setIsFocused(false)
                if (props.onBlur) {
                    props.onBlur(e)
                }
            }}
            onFocus={(e) => {
                setIsFocused(true)
                if (props.onFocus) {
                    props.onFocus(e)
                }
            }}
            style={{
                flex: 1,
                paddingVertical: 12,
                borderColor: isFocused ? color.input_focus_border : color.input_unfocus_border,
                borderWidth: isFocused ? 2 : 0,
            }}
            textAlignVertical={"top"}
            isFocused={isFocused}
            {...props}
        />
    )
})
