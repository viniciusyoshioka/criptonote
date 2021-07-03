import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component/Header"
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
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={`Nota${props.isChanged ? "*" : ""}${props.title !== "" ? `: "${props.title}"` : ""}`} />

            <HeaderButton
                icon={"save"}
                onPress={props.saveNote}
            />

            <HeaderButton
                icon={"close"}
                onPress={props.goBack}
            />

            <ReadHeaderMenu
                changePassword={props.changePassword}
                deleteNote={props.deleteNote}
            />
        </Header>
    )
}
