import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component"


export interface SettingsHeaderProps {
    goBack: () => void,
}


export function SettingsHeader(props: SettingsHeaderProps) {
    return (
        <Header>
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={"Configurações"} />
        </Header>
    )
}
