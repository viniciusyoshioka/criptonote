import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"
import styled from "styled-components/native"

import { Input } from "../Input"


const InputTitleBase = styled(Input)`
    margin-bottom: 8px;
    elevation: 2;
`


export const InputTitle = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {
    return (
        <InputTitleBase
            autoFocus={true}
            placeholder={"Título"}
            ref={ref}
            returnKeyType={"next"}
            {...props}
        />
    )
})
