import React from "react"
import { RectButton, RectButtonProps } from "react-native-gesture-handler"
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { styledProps, useTheme } from "../../service/theme"


const ListItemBase = styled(RectButton)`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 16px;
    height: 72px;
    max-height: 72px;
    background-color ${(props: styledProps) => props.theme.color.settingsButton_background};
`


const ViewIcon = styled.View`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    max-width: 40px;
    max-height: 40px;
    margin-right: 16px;
`


const ViewText = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    height: 40px;
    max-height: 40px;
`


const TextTitle = styled.Text`
    width: 100%;
    font-size: 16px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.settingsButton_color};
`


const TextDescription = styled.Text`
    width: 100%;
    font-size: 13px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.settingsButton_color};
`


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
                        color={color.settingsButton_color}
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
