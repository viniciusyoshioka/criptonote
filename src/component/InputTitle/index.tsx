import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"

import { Input } from "../Input"


export const InputTitle = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {
    return (
        <Input
            autoFocus={true}
            placeholder={"Título"}
            ref={ref}
            returnKeyType={"next"}
            style={{ marginBottom: 8 }}
            {...props}
        />
    )
})
