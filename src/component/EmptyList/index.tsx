import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const EmptyListView = styled.View`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    flex: 1;
    align-items: center;
    justify-content: center;
`


export const EmptyListImage = styled.Image`
    width: 100px;
    height: 100px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    tint-color: ${(props: styledProps) => props.theme.color.screen_color};
`


export const EmptyListText = styled.Text`
    font-size: 16px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.screen_color};
`
