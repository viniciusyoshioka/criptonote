import React from "react"

import { BlockCenter, BlockLeft, Header, HeaderButton, HeaderTitle } from "../../component/Header"


export interface FileExplorerHeaderProps {
    goBack: () => void,
}


export function FileExplorerHeader(props: FileExplorerHeaderProps) {
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
                    Escolher arquivo
                </HeaderTitle>
            </BlockCenter>
        </Header>
    )
}
