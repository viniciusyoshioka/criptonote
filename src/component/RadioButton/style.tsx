import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-vertical: 4px;
`


export const Radio = styled.View`
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-width: 2px;
    border-radius: 24px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    border-color: ${(props: styledProps & {checked: boolean}) => 
        props.checked
            ? props.theme.color.radioButton_checked_color
            : props.theme.color.radioButton_unchecked_color};
`


export const Check = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 12px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    background-color: ${(props: styledProps & {checked: boolean}) => 
        props.checked
            ? props.theme.color.radioButton_checked_color
            : props.theme.color.radioButton_unchecked_color};
`


export const Text = styled.Text`
    margin-left: 16px;
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.radioButton_unchecked_color};
`
