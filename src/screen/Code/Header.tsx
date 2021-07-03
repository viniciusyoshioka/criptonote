import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component/Header"


export interface CodeHeaderProps {
    goBack: () => void,
}


export function CodeHeader(props: CodeHeaderProps) {
    return (
        <Header>
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={"Abrir nota"} />
        </Header>
    )
}
