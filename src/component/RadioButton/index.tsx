import React from "react"
import { TouchableOpacityProps } from "react-native"

import { Button, Check, Radio, Text } from "./style"


export interface RadioButtonProps extends TouchableOpacityProps {
    text?: string,
    value?: boolean,
}


export function RadioButton(props: RadioButtonProps) {
    return (
        <Button {...props}>
            <Radio checked={props.value ? true : false}>
                {props.value && <Check checked={props.value ? true : false} />}
            </Radio>

            {props.text && (
                <Text>
                    {props.text}
                </Text>
            )}
        </Button>
    )
}
