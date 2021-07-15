import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"

import { useTheme } from "../../service/theme"
import { MenuItemBase, MenuItemText } from "./style"


export interface MenuItemProps extends RectButtonProps {
    text: string,
}


export function MenuItem(props: MenuItemProps) {


    const { color } = useTheme()


    return (
        <MenuItemBase rippleColor={color.menuItem_ripple} {...props}>
            <MenuItemText numberOfLines={1}>
                {props.text}
            </MenuItemText>
        </MenuItemBase>
    )
}
