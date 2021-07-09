import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component"


export interface ChoosePasswordTypeHeaderProps {
    goBack: () => void,
}


export function ChoosePasswordTypeHeader(props: ChoosePasswordTypeHeaderProps) {
    return (
        <Header>
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={"Escolher tipo de senha"} />
        </Header>
    )
}
