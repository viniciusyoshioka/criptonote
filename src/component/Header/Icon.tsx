import React from "react"
import Icon from "react-native-vector-icons/Ionicons"

import { useTheme } from "../../service/theme"


export const headerIconSize = 24


export interface HeaderIconProps {
    iconName: string,
    iconSize?: number
}


export function HeaderIcon(props: HeaderIconProps) {


    const { color, opacity } = useTheme()


    return (
        <Icon
            name={props.iconName}
            size={props.iconSize || headerIconSize}
            color={color.header_color}
            style={{
                opacity: opacity.headerEmphasis
            }}
        />
    )
}
