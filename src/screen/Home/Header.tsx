import React from "react"

import { BlockCenter, BlockLeft, BlockRight, Header, HeaderButton, HeaderTitle } from "../../component/Header"
import { appFName } from "../../service/constant"
import { HomeHeaderMenu } from "./HeaderMenu"


export interface HomeHeaderProps {
    selectionMode: boolean,
    exitSelectionMode: () => void,
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
            {props.selectionMode && (
                <BlockLeft>
                    <HeaderButton
                        iconName={"md-close"}
                        onPress={props.exitSelectionMode}
                    />
                </BlockLeft>
            )}

            {!props.selectionMode && (
                <BlockCenter>
                    <HeaderTitle>
                        {appFName}
                    </HeaderTitle>
                </BlockCenter>
            )}

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
