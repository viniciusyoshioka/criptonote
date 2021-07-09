import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component"


export interface ProcessingEncryptionHeaderProps {
    goBack: () => void,
    stopEncryptionTask: () => void,
}


export function ProcessingEncryptionHeader(props: ProcessingEncryptionHeaderProps) {
    return (
        <Header>
            <HeaderButton
                onPress={props.goBack}
                icon={"arrow-back"}
            />

            <HeaderTitle title={"Processando"} />

            <HeaderButton
                icon={"block"}
                onPress={props.stopEncryptionTask}
            />
        </Header>
    )
}
