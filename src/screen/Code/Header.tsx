import React, { memo } from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface CodeHeaderProps {
    goBack: () => void,
}


export const CodeHeader = memo((props: CodeHeaderProps) => {
    return (
        <Header>
            <BlockLeft>
                <HeaderButton 
                    onPress={props.goBack} 
                    iconName={"arrow-back"}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    Abrir nota
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
})
