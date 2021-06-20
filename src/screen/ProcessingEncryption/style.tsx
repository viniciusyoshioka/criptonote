import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const MessageText = styled.Text`
    margin: 8px;
    font-size: 16px;
    color: ${(props: styledProps) => props.theme.color.screen_color};
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
`
