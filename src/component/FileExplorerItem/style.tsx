import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

import { styledProps } from "../../service/theme"


export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 56px;
    padding-horizontal: 16px;
    background-color: ${(props: styledProps) => props.theme.color.fileExplorerItem_background};
`


export const ViewIcon = styled.View`
    align-items: center;
    justify-content: center;
    margin-right: 24px;
`


export const ViewPath = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`


export const ItemNameText = styled.Text`
    width: 100%;
    font-size: 17px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.fileExplorerItem_color};
`


export const FullPathText = styled.Text`
    width: 100%;
    font-size: 13px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.fileExplorerItem_color};
`
