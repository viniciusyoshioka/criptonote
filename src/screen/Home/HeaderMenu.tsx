import React, { useRef } from "react"
import { BackHandler } from "react-native"
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { RectButton } from "react-native-gesture-handler"

import { HeaderButton, MenuItem } from "../../component"


export interface HomeHeaderMenuProps {
    selectionMode: boolean,
    importNote: () => void,
    exportNote: () => void,
    encryptFile: () => void,
    openSettings: () => void,
}


export function HomeHeaderMenu(props: HomeHeaderMenuProps) {


    const menuRef = useRef<Menu>(null)


    function backhandlerFunction() {
        if (menuRef.current?.isOpen()) {
            menuRef.current?.close()
            return true
        }
        return false
    }

    function setBackhandler() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            backhandlerFunction
        )
    }

    function removeBackhandler() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            backhandlerFunction
        )
    }


    return (
        <Menu ref={menuRef} onClose={removeBackhandler} onOpen={setBackhandler}>
            <MenuTrigger customStyles={{ TriggerTouchableComponent: RectButton }}>
                <HeaderButton
                    icon={"more-vert"}
                    onPress={() => menuRef.current?.open()}
                />
            </MenuTrigger>

            <MenuOptions>
                {!props.selectionMode && (
                    <MenuItem
                        text={"Importar Nota"}
                        onPress={() => {
                            menuRef.current?.close()
                            props.importNote()
                        }}
                    />
                )}

                <MenuItem
                    text={"Exportar Nota"}
                    onPress={() => {
                        menuRef.current?.close()
                        props.exportNote()
                    }}
                />

                {!props.selectionMode && (
                    <MenuItem
                        text={"Arquivos"}
                        onPress={() => {
                            menuRef.current?.close()
                            props.encryptFile()
                        }}
                    />
                )}

                {!props.selectionMode && (
                    <MenuItem
                        text={"Configurações"}
                        onPress={() => {
                            menuRef.current?.close()
                            props.openSettings()
                        }}
                    />
                )}
            </MenuOptions>
        </Menu>
    )
}
