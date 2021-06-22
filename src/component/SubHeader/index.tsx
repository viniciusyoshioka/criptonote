import React from "react"
import { TextProps } from "react-native"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const SubHeader = styled.View`
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 28px;
    padding: 4px 16px;
    background-color: ${(props: styledProps) => props.theme.color.subHeader_background};
    elevation: 4;
`


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
