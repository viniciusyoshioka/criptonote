import { TextInputProps } from "react-native"
import styled from "styled-components/native"

import { StyledProps } from "@theme"


export interface InputBaseProps extends TextInputProps {
    isFocused?: boolean;
}


export const InputBase = styled.TextInput<InputBaseProps & StyledProps>`
    height: 48px;
    padding-vertical: 8px;
    padding-horizontal: 16px;
    font-size: ${props => props.theme.typography.body.large.fontSize}px;    

    border-top-left-radius: ${props => props.theme.shape.extraSmall}px;
    border-top-right-radius: ${props => props.theme.shape.extraSmall}px;
    border-bottom-width: ${props => props.isFocused ? 2 : 0}px;
    border-color: ${props => props.theme.color.primary};

    background-color: ${props => props.theme.color.surfaceContainerHighest};
    color: ${props => props.theme.color.onSurface};    
`
