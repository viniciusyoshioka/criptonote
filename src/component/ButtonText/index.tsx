import React from "react"
import { TouchableOpacityProps } from "react-native"

import { ButtonBase, ButtonTextContent } from "./style"


export interface ButtonTextProps extends TouchableOpacityProps {
    text?: string,
}


export function ButtonText(props: ButtonTextProps) {
    return (
        <ButtonBase
            activeOpacity={0.8}
            style={{ paddingHorizontal: 8 }}
            {...props}
        >
            {props.text && (
                <ButtonTextContent>
                    {props.text}
                </ButtonTextContent>
            )}
        </ButtonBase>
    )
}
