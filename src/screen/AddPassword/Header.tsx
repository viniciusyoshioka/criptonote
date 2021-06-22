import React, { memo } from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface AddPasswordHeaderProps {
    goBack: () => void,
}


export const AddPasswordHeader = memo((props: AddPasswordHeaderProps) => {
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
                    Adicionar senha
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
})
