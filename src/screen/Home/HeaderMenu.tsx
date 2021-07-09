import React, { useCallback, useRef } from "react"
import { BackHandler } from "react-native"
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { RectButton } from "react-native-gesture-handler"

import { HeaderButton } from "../../component/Header"
import { MenuItem } from "../../component/MenuItem"
import { appInDevelopment } from "../../service/constant"


export interface HomeHeaderMenuProps {
    selectionMode: boolean,
    importNote: () => void,
    exportNote: () => void,
    encryptFile: () => void,
    openSettings: () => void,
    switchDebugHome: () => void,
}


export function HomeHeaderMenu(props: HomeHeaderMenuProps) {


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
                    <>
                        <MenuItem
                            text={"Configurações"}
                            onPress={() => {
                                menuRef.current?.close()
                                props.openSettings()
                            }}
                        />

                        {appInDevelopment && (
                            <MenuItem
                                text={"Debug Home"}
                                onPress={() => {
                                    menuRef.current?.close()
                                    props.switchDebugHome()
                                }}
                            />
                        )}
                    </>
                )}
            </MenuOptions>
        </Menu>
    )
}
