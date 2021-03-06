import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 40px;
    padding-vertical: 8px;
`


export const Text = styled.Text`
    margin-left: 24px;
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.radioButton_unchecked_color};
`
