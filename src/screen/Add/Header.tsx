import React from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle, BlockRight } from "../../component/Header"


export interface AddHeaderProps {
    goBack: () => void,
    saveNote: () => void,
    cancelNote: () => void,
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

            <BlockRight>
                <HeaderButton
                    iconName={"md-save"}
                    onPress={props.saveNote}
                />

                <HeaderButton
                    iconName={"md-close"}
                    onPress={props.cancelNote}
                />
            </BlockRight>
        </Header>  
    )
}
