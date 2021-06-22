import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const AppName = styled.Text`
    text-align: center;
    margin-top: 100px;
    font-size: 22px;
    color: ${(props: styledProps) => props.theme.color.screen_color};
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
`
