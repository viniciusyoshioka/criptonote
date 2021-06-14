import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const SafeScreen = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props: styledProps) => props.theme.color.screen_background};
`


export const SpaceScreen = styled.View`
    flex: 1;
    margin: 8px;
`
