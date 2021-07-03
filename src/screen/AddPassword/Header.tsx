import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component/Header"


export interface AddPasswordHeaderProps {
    goBack: () => void,
}


export function AddPasswordHeader(props: AddPasswordHeaderProps) {
    return (
        <Header>
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={"Adicionar senha"} />
        </Header>
    )
}
