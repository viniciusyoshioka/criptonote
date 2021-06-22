import React from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle, BlockRight } from "../../component/Header"
import { ReadHeaderMenu } from "./HeaderMenu"


export interface ReadHeaderProps {
    isChanged: boolean,
    title: string,
    goBack: () => void,
    saveNote: () => void,
    changePassword: () => void,
    deleteNote: () => void,
}


export function ReadHeader(props: ReadHeaderProps) {
    return (
        <Header>
            <BlockLeft>
                <HeaderButton 
                    onPress={props.goBack} 
                    iconName={"arrow-back"}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    {`Nota${props.isChanged ? "*" : ""}${props.title !== "" ? `: "${props.title}"` : ""}`}
                </HeaderTitle>
            </BlockCenter>

            <BlockRight>
                <HeaderButton
                    iconName={"save"}
                    onPress={props.saveNote}
                />

                <HeaderButton
                    iconName={"close"}
                    onPress={props.goBack}
                />

                <ReadHeaderMenu
                    changePassword={props.changePassword}
                    deleteNote={props.deleteNote}
                />
            </BlockRight>
        </Header>  
    )
}
