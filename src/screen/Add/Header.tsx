import React from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface AddHeaderProps {
    goBack: () => void,
}


export function AddHeader(props: AddHeaderProps) {
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
                    Adicionar
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
}
