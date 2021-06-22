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
                    iconName={"arrow-back"}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    Adicionar
                </HeaderTitle>
            </BlockCenter>

            <BlockRight>
                <HeaderButton
                    iconName={"save"}
                    onPress={props.saveNote}
                />

                <HeaderButton
                    iconName={"close"}
                    onPress={props.cancelNote}
                />
            </BlockRight>
        </Header>  
    )
}
