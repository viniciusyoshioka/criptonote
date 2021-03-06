import React, { useRef } from "react"
import { BackHandler } from "react-native"
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { RectButton } from "react-native-gesture-handler"

import { HeaderButton, MenuItem } from "../../component"


export interface ReadHeaderMenuProps {
    exportNote: () => void,
    changePassword: () => void,
    deleteNote: () => void,
}


export function ReadHeaderMenu(props: ReadHeaderMenuProps) {


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
                <MenuItem
                    text={"Exportar nota"}
                    onPress={() => {
                        menuRef.current?.close()
                        props.exportNote()
                    }}
                />

                <MenuItem
                    text={"Mudar senha"}
                    onPress={() => {
                        menuRef.current?.close()
                        props.changePassword()
                    }}
                />

                <MenuItem
                    text={"Apagar"}
                    onPress={() => {
                        menuRef.current?.close()
                        props.deleteNote()
                    }}
                />
            </MenuOptions>
        </Menu>
    )
}
