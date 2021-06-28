import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const Button = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`


export const Text = styled.Text`
    margin-top: 10px;
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.screen_color};
`
