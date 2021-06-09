import React from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface CodeHeaderProps {
    goBack: () => void
}


export function CodeHeader(props: CodeHeaderProps) {
    return (
        <Header>
            <BlockLeft>
                <HeaderButton 
                    onPress={props.goBack} 
                    iconName={"md-arrow-back"}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    Abrir nota
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
}
