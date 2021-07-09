import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/MaterialIcons"

import { useTheme } from "../../service/theme"
import { ListItemBase, TextDescription, TextTitle, ViewIcon, ViewText } from "./style"


export interface ListItemProps extends RectButtonProps {
    title?: string,
    description?: string,
    icon?: string,
}


export function ListItem(props: ListItemProps) {


    const { color, opacity } = useTheme()


    return (
        <ListItemBase {...props}>
            {props.icon && (
                <ViewIcon>
                    <Icon
                        name={props.icon}
                        size={24}
                        color={color.listItem_color}
                        style={{
                            opacity: opacity.highEmphasis
                        }}
                    />
                </ViewIcon>
            )}

            <ViewText>
                {props.title && (
                    <TextTitle numberOfLines={1}>
                        {props.title}
                    </TextTitle>
                )}

                {props.description && (
                    <TextDescription numberOfLines={1}>
                        {props.description}
                    </TextDescription>
                )}
            </ViewText>
        </ListItemBase>
    )
}
