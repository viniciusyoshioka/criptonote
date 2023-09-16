import styled from "styled-components/native"

import { StyledProps } from "@theme"


export const NOTE_ITEM_HEIGHT = 60


export const NoteItemButton = styled.Pressable<StyledProps>`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: ${NOTE_ITEM_HEIGHT}px;
    padding-horizontal: 16px;
    padding-vertical: 8px;
    background-color: ${props => props.theme.color.surface};
`


export const NoteItemBlock = styled.View`
    flex: 1;
    justify-content: center;
`
