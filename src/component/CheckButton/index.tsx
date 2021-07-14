import React from "react"
import { TouchableOpacityProps } from "react-native"
import CheckBox from "@react-native-community/checkbox"

import { Button, Text } from "./style"
import { useTheme } from "../../service/theme"


export interface CheckButtonProps extends TouchableOpacityProps {
    text?: string,
    value?: boolean,
    onValueChange: (newValue: boolean) => void,
}


export function CheckButton(props: CheckButtonProps) {


    const { color, opacity } = useTheme()


    return (
        <Button
            activeOpacity={0.8}
            {...props}
        >
            <CheckBox
                value={props.value}
                onValueChange={props.onValueChange}
                tintColors={{
                    true: color.checkButton_checked_color,
                    false: color.checkButton_unchecked_color,
                }}
                style={{ opacity: opacity.highEmphasis }}
            />

            {props.text && (
                <Text>
                    {props.text}
                </Text>
            )}
        </Button>
    )
}
