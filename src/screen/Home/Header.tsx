import React from "react"

import { BlockCenter, BlockRight, Header, HeaderButton, HeaderTitle } from "../../component/Header"
import { appFName } from "../../service/constant"
import { HomeHeaderMenu } from "./HeaderMenu"


export interface HomeHeaderProps {
    selectionMode: boolean,
    deleteNote: () => void,
    addNote: () => void,
    importNote: () => void,
    exportNote: () => void,
    encryptFile: () => void,
    openSettings: () => void,
    switchDebugHome: () => void,
}


export function HomeHeader(props: HomeHeaderProps) {
    return (
        <Header>
            <BlockCenter>
                <HeaderTitle>
                    {appFName}
                </HeaderTitle>
            </BlockCenter>

            <BlockRight>
                {props.selectionMode && (
                    <HeaderButton
                        iconName={"md-trash"}
                        onPress={props.deleteNote}
                    />
                )}

                {!props.selectionMode && (
                    <HeaderButton
                        iconName={"md-add"}
                        onPress={props.addNote}
                        iconSize={30}
                    />
                )}

                <HomeHeaderMenu
                    selectionMode={props.selectionMode}
                    importNote={props.importNote}
                    exportNote={props.exportNote}
                    encryptFile={props.encryptFile}
                    openSettings={props.openSettings}
                    switchDebugHome={props.switchDebugHome}
                />
            </BlockRight>
        </Header>
    )
}
