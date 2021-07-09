import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component"


export interface FileExplorerHeaderProps {
    goBack: () => void,
}


export function FileExplorerHeader(props: FileExplorerHeaderProps) {
    return (
        <Header>
            <HeaderButton
                icon={"arrow-back"}
                onPress={props.goBack}
            />

            <HeaderTitle title={"Escolher arquivo"} />
        </Header>
    )
}
