import { RectButton } from "react-native-gesture-handler"
import styled from "styled-components/native"


export const DebugButtonBase = styled(RectButton)`
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 50px;
    height: 50px;
    background-color: rgb(0, 0, 100);
`


export const DebugButtonText = styled.Text`
    font-size: 13px;
    color: rgb(255, 255, 255);
`
