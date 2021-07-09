import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"

import { MenuItemBase, MenuItemText } from "./style"


export interface MenuItemProps extends RectButtonProps {
    text: string,
}


export function MenuItem(props: MenuItemProps) {
    return (
        <MenuItemBase {...props}>
            <MenuItemText numberOfLines={1}>
                {props.text}
            </MenuItemText>
        </MenuItemBase>
    )
}
