import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-vertical: 4px;
`


export const Text = styled.Text`
    margin-left: 16px;
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.radioButton_unchecked_color};
`
