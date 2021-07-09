import { RectButton } from "react-native-gesture-handler"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const MenuItemBase = styled(RectButton)`
    align-items: flex-start;
    justify-content: center;
    padding-horizontal: 16px;
    height: 48px;
    background-color: ${(props: styledProps) => props.theme.color.popupMenuButton_background};
`


export const MenuItemText = styled.Text`
    width: 100%;
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.popupMenuButton_color};
`
