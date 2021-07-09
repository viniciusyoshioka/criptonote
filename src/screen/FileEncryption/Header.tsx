import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component"


export interface FileEncryptionHeaderProps {
    goBack: () => void,
    encryptFile: () => void,
    decryptFile: () => void,
    cancel: () => void,
}


export function FileEncryptionHeader(props: FileEncryptionHeaderProps) {
    return (
        <Header>
            <HeaderButton
                icon={"arrow-back"}
                onPress={props.goBack}
            />

            <HeaderTitle title={"Encriptar arquivo"} />

            <HeaderButton
                icon={"lock"}
                onPress={props.encryptFile}
            />

            <HeaderButton
                icon={"lock-open"}
                onPress={props.decryptFile}
            />

            <HeaderButton
                icon={"close"}
                onPress={props.cancel}
            />
        </Header>
    )
}
