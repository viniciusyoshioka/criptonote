import React, { useCallback, useEffect, useState } from "react"
import { Alert, FlatList } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"
import RNFS, { ReadDirItem } from "react-native-fs"

import { SafeScreen } from "../../component/Screen"
import { FileExplorerHeader } from "./Header"
import { fullPathDecrypted, fullPathEncrypted, fullPathExported } from "../../service/constant"
import { FileExplorerItem } from "../../component/FileExplorerItem"
import { useBackHandler } from "../../service/hook"
import { SubHeader, SubHeaderText } from "../../component/SubHeaderPath"
import { importNote } from "../../service/note-handler"
import { log } from "../../service/log"
import { ScreenParams } from "../../service/screen-params"


const defaultContent: Array<ReadDirItem> = [
    {
        name: "Dispositivo",
        path: RNFS.ExternalStorageDirectoryPath,
        isFile: () => false,
        isDirectory: () => true,
        ctime: undefined,
        mtime: undefined,
        size: "",
    },
    {
        name: "Cartão de Memória",
        path: "/storage/extSdCard",
        isFile: () => false,
        isDirectory: () => true,
        ctime: undefined,
        mtime: undefined,
        size: "",
    },
    {
        name: "Notas Exportadas",
        path: fullPathExported,
        isFile: () => false,
        isDirectory: () => true,
        ctime: undefined,
        mtime: undefined,
        size: "",
    },
    {
        name: "Arquivos Criptografados",
        path: fullPathEncrypted,
        isFile: () => false,
        isDirectory: () => true,
        ctime: undefined,
        mtime: undefined,
        size: "",
    },
    {
        name: "Arquivos Descriptografados",
        path: fullPathDecrypted,
        isFile: () => false,
        isDirectory: () => true,
        ctime: undefined,
        mtime: undefined,
        size: "",
    },
]


const returnDirectoryItem: ReadDirItem = {
    name: "..",
    path: "..",
    isFile: () => false,
    isDirectory: () => true,
    ctime: undefined,
    mtime: undefined,
    size: "",
}


export function FileExplorer() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "FileExplorer">>()

    const [path, setPath] = useState<string | null>(null)
    const [pathContent, setPathContent] = useState<Array<ReadDirItem>>(defaultContent)
    const [backToDefault, setBackToDefault] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })


    const upDirectory = useCallback(() => {
        switch (path) {
            case null:
                return
            case RNFS.ExternalStorageDirectoryPath:
                setPath(null)
                return
            case "/storage/extSdCard":
                setPath(null)
                return
            case fullPathExported:
                if (backToDefault) {
                    setPath(null)
                    setBackToDefault(false)
                    return
                }
                break
            case fullPathEncrypted:
                if (backToDefault) {
                    setPath(null)
                    setBackToDefault(false)
                    return
                }
                break
            case fullPathDecrypted:
                if (backToDefault) {
                    setPath(null)
                    setBackToDefault(false)
                    return
                }
                break
            default:
                break
        }

        const splitedPath = path.split("/")
        let previewsPath = ""
        for (let x = 0; x < splitedPath.length - 1; x++) {
            if (x === 0) {
                previewsPath += `${splitedPath[x]}`
            } else {
                previewsPath += `/${splitedPath[x]}`
            }
        }

        if (previewsPath === "") {
            setPath("/")
            return
        }
        setPath(previewsPath)
    }, [path, backToDefault])

    const importNoteAlert = useCallback((newPath: string) => {
        // TODO
        function importNoteFunction(newPath: string) {
            importNote(newPath)
                .then((isNoteImported: boolean) => {
                    if (isNoteImported) {
                        navigation.reset({ routes: [{ name: "Home" }] })
                        return
                    }
                })

            Alert.alert(
                "Aguarde",
                "Importar notas pode demorar alguns instantes"
            )
        }

        Alert.alert(
            "Importar",
            "Deseja importar esta nota?",
            [
                {text: "Cancelar", onPress: () => {}},
                {text: "Importar", onPress: () => importNoteFunction(newPath)}
            ]
        )
    }, [])

    const encryptFileAlert = useCallback((filePath: string) => {
        navigation.navigate("FileEncryption", {filePath: filePath})
    }, [])

    const changePath = useCallback(async (newPath: string, isFile: boolean) => {
        if (newPath === "..") {
            upDirectory()
        } else if (isFile) {
            if (params.action === "import") {
                importNoteAlert(newPath)
            } else if (params.action === "encrypt") {
                encryptFileAlert(newPath)
            }
        } else {
            const intoExported = (path === null && newPath === fullPathExported)
            const intoEncrypted = (path === null && newPath === fullPathEncrypted)
            const intoDecrypted = (path === null && newPath === fullPathDecrypted)
            if (intoExported || intoEncrypted || intoDecrypted) {
                setBackToDefault(true)
            }
            setPath(newPath)
        }
    }, [upDirectory, path])

    const goBack = useCallback(() => {
        if (path === null) {
            navigation.navigate("Home")
            return
        } else if (path === "/") {
            setPath(null)
            return
        }
        changePath("..", false)
    }, [path, changePath])

    const renderItem = useCallback(({item}: {item: RNFS.ReadDirItem}) => {
        return (
            <FileExplorerItem
                name={item.name}
                path={item.path}
                isFile={item.isFile()}
                onPress={async () => await changePath(item.path, item.isFile())}
            />
        )
    }, [changePath])


    useEffect(() => {
        if (path === null) {
            setPathContent(defaultContent)
        } else {
            RNFS.readDir(path)
                .then((dirContent: Array<ReadDirItem>) => {
                    if (path === "/") {
                        setPathContent(dirContent)
                    } else {
                        setPathContent([returnDirectoryItem, ...dirContent])
                    }
                })
                .catch((error) => {
                    setPathContent([returnDirectoryItem])
                    log("ERROR", `Erro lendo pasta ao mudar de diretório. Mensagem: "${error}"`)
                    Alert.alert(
                        "Erro",
                        "Não foi possível abrir pasta"
                    )
                })
        }
    }, [path])


    return (
        <SafeScreen>
            <FileExplorerHeader
                goBack={() => navigation.navigate("Home")}
            />

            {path && (
                <SubHeader>
                    <SubHeaderText>
                        {path}
                    </SubHeaderText>
                </SubHeader>
            )}

            <FlatList
                data={pathContent}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                extraData={[changePath]}
                initialNumToRender={10}
            />
        </SafeScreen>
    )
}
