import React from "react"
import { TextProps } from "react-native"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


const HeaderTitleBase = styled.Text`
    flex: 1;
    font-size: 20px;
    margin-right: 4px;
    opacity: ${(props: styledProps) => props.theme.opacity.headerEmphasis};
    color: ${(props: styledProps) => props.theme.color.header_color};
`


export interface HeaderTitleProps extends TextProps {
    title?: string,
}


export function HeaderTitle(props: HeaderTitleProps) {
    return (
        <HeaderTitleBase {...props} numberOfLines={1}>
            {props.title}
        </HeaderTitleBase>
    )
}
