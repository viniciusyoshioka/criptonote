import React from "react"

import { Header, HeaderButton, HeaderTitle } from "../../component/Header"
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
                <HeaderButton
                    icon={"close"}
                    onPress={props.exitSelectionMode}
                />
            )}

            <HeaderTitle title={!props.selectionMode ? appFName : ""} />

            {props.selectionMode && (
                <HeaderButton
                    icon={"delete"}
                    onPress={props.deleteNote}
                />
            )}

            <HeaderButton
                icon={"add"}
                onPress={props.addNote}
                iconSize={30}
            />

            <HomeHeaderMenu
                selectionMode={props.selectionMode}
                importNote={props.importNote}
                exportNote={props.exportNote}
                encryptFile={props.encryptFile}
                openSettings={props.openSettings}
                switchDebugHome={props.switchDebugHome}
            />
        </Header>
    )
}
