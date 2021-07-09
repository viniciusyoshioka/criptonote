import React, { useCallback, useRef } from "react"
import { BackHandler } from "react-native"
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { RectButton } from "react-native-gesture-handler"

import { HeaderButton, MenuItem } from "../../component"


export interface ReadHeaderMenuProps {
    changePassword: () => void,
    deleteNote: () => void,
}


export function ReadHeaderMenu(props: ReadHeaderMenuProps) {


    const menuRef = useRef<Menu>(null)


    const backhandlerFunction = useCallback(() => {
        if (menuRef.current?.isOpen()) {
            menuRef.current?.close()
            return true
        }
        return false
    }, [menuRef])

    const setBackhandler = useCallback(() => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            backhandlerFunction
        )
    }, [backhandlerFunction])

    const removeBackhandler = useCallback(() => {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            backhandlerFunction
        )
    }, [backhandlerFunction])


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
