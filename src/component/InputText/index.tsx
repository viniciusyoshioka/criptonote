import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"
import styled from "styled-components/native"

import { Input } from "../Input"


const InputTextBase = styled(Input)`
    flex: 1;
    padding-vertical: 12px;
`


export const InputText = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {
    return (
        <InputTextBase
            multiline={true}
            placeholder={"Texto"}
            ref={ref}
            textAlignVertical={"top"}
            {...props}
        />
    )
})
