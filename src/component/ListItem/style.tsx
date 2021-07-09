import { RectButton } from "react-native-gesture-handler"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const ListItemBase = styled(RectButton)`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 16px;
    height: 72px;
    max-height: 72px;
    background-color ${(props: styledProps) => props.theme.color.listItem_background};
`


export const ViewIcon = styled.View`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    max-width: 40px;
    max-height: 40px;
    margin-right: 16px;
`


export const ViewText = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    height: 40px;
    max-height: 40px;
`


export const TextTitle = styled.Text`
    width: 100%;
    font-size: 16px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.listItem_color};
`


export const TextDescription = styled.Text`
    width: 100%;
    font-size: 13px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.listItem_color};
`
