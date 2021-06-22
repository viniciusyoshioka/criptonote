import React from "react"

import { BlockCenter, BlockLeft, BlockRight, Header, HeaderButton, HeaderTitle } from "../../component/Header"


export interface FileEncryptionHeaderProps {
    goBack: () => void,
    encryptFile: () => void,
    decryptFile: () => void,
    cancel: () => void,
}


export function FileEncryptionHeader(props: FileEncryptionHeaderProps) {
    return (
        <Header>
            <BlockLeft>
                <HeaderButton
                    iconName={"arrow-back"}
                    onPress={props.goBack}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    Encriptar arquivo
                </HeaderTitle>
            </BlockCenter>

            <BlockRight>
                <HeaderButton
                    iconName={"lock"}
                    onPress={props.encryptFile}
                />

                <HeaderButton
                    iconName={"lock-open"}
                    onPress={props.decryptFile}
                />

                <HeaderButton
                    iconName={"close"}
                    onPress={props.cancel}
                />
            </BlockRight>
        </Header>
    )
}
