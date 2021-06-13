import styled from "styled-components/native"

import { Input } from "../../component/Input"
import { styledProps } from "../../service/theme"


export const AppName = styled.Text`
    margin-top: 100px;
    margin-bottom: 50px;
    font-size: 22px;
    color: ${(props: styledProps) => props.theme.color.screen_color};
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
`


export const PasswordInput = styled(Input)`
    padding-left: 20px;
    padding-right: 20px;
    font-size: 20px;
    border-bottom-width: 2px;
    background-color: transparent;
    border-color: ${(props: styledProps) => props.theme.color.screen_color};
`
