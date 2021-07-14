import React from "react"
import { TouchableOpacityProps } from "react-native"

import { ButtonBase, ButtonIcon, ButtonTextContent } from "./style"


export interface ButtonOutlineProps extends TouchableOpacityProps {
    text?: string,
    icon?: string,
}


export function ButtonOutline(props: ButtonOutlineProps) {
    return (
        <ButtonBase
            activeOpacity={0.8}
            style={{
                paddingRight: 16,
                paddingLeft: (props.icon === undefined) ? 16 : 12,
            }}
            {...props}
        >
            {props.icon && (
                <ButtonIcon
                    icon={props.icon}
                />
            )}

            {props.text && (
                <ButtonTextContent>
                    {props.text}
                </ButtonTextContent>
            )}
        </ButtonBase>
    )
}
