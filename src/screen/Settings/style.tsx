import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const ViewVersion = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin: 6px;
`


export const TextVersion = styled.Text`
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.screen_color};
`
