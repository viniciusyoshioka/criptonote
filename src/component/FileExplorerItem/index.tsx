import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"

import { useTheme } from "../../service/theme"
import { Button, FullPathText, ItemNameText, ViewIcon, ViewPath } from "./style"


export interface FileExplorerItemProps extends RectButtonProps {
    name: string,
    path: string,
    isFile: boolean,
}


export function FileExplorerItem(props: FileExplorerItemProps) {


    const { color, opacity } = useTheme()


    return (
        <Button {...props}>
            <ViewIcon>
                <Icon
                    name={props.isFile ? "md-document-sharp" : "md-folder-sharp"}
                    size={24}
                    color={color.fileExplorerItem_color}
                    style={{
                        opacity: opacity.highEmphasis
                    }}
                />
            </ViewIcon>

            <ViewPath>
                <ItemNameText numberOfLines={1}>
                    {props.name}
                </ItemNameText>

                <FullPathText numberOfLines={1}>
                    {props.path}
                </FullPathText>
            </ViewPath>
        </Button>
    )
}
