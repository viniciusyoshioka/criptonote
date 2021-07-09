import React from "react"
import { TextProps } from "react-native"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


const SubHeaderTextBase = styled.Text`
    width: 100%;
    font-size: 13px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.subHeader_color};
`


export interface SubHeaderTextProps extends TextProps {
    children?: string
}


export function SubHeaderText(props: SubHeaderTextProps) {
    return (
        <SubHeaderTextBase
            numberOfLines={1}
            ellipsizeMode={"head"}
            {...props}
        />
    )
}
