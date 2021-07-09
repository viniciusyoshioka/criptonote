import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component"


export interface AddHeaderProps {
    goBack: () => void,
    saveNote: () => void,
    cancelNote: () => void,
}


export function AddHeader(props: AddHeaderProps) {
    return (
        <Header>
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={"Adicionar"} />

            <HeaderButton
                icon={"save"}
                onPress={props.saveNote}
            />

            <HeaderButton
                icon={"close"}
                onPress={props.cancelNote}
            />
        </Header>
    )
}
