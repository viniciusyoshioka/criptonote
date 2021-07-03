import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"

import { Input } from "../Input"


export const InputText = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {
    return (
        <Input
            multiline={true}
            placeholder={"Texto"}
            ref={ref}
            returnKeyType={"done"}
            style={{
                flex: 1,
                paddingVertical: 12,
            }}
            textAlignVertical={"top"}
            {...props}
        />
    )
})
