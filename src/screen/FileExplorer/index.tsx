import { Screen } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list"
import { Fragment, useEffect, useState } from "react"
import { Alert } from "react-native"
import RNFS, { ReadDirItem } from "react-native-fs"

import { EmptyList } from "@components"
import { useBackHandler } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"
import { Constants } from "@services/constant"
import { createAllFolders } from "@services/folder-handler"
import { log, stringifyError } from "@services/log"
import { Divider, List } from "react-native-paper"
import { FileItem } from "./FileItem"
import { FileExplorerHeader } from "./Header"


export function FileExplorer() {


    const navigation = useNavigation<NavigationParamProps<"FileExplorer">>()
    const { params } = useRoute<RouteParamProps<"FileExplorer">>()

    const [pathToRead, setPathToRead] = useState<string>()
    const [pathContent, setPathContent] = useState<ReadDirItem[]>([])


    useBackHandler(() => {
        if (!pathToRead) {
            navigation.goBack()
            return true
        }
        if (pathToRead === Constants.fullPathDeviceRootInternalStorage) {
            setPathToRead(undefined)
            setPathContent([])
            return true
        }

        const upDirectory = getUpDirectory()
        setPathToRead(upDirectory)
        return true
    })


    function goBackHeader() {
        if (pathToRead) {
            setPathToRead(undefined)
            setPathContent([])
            return
        }

        navigation.goBack()
    }

    function getUpDirectory() {
        if (!pathToRead) return

        const splitedPathToRead = pathToRead.split("/")
        splitedPathToRead.pop()
        return splitedPathToRead.join("/")
    }

    function renderItem({ item, index }: ListRenderItemInfo<ReadDirItem>) {
        return (
            <FileItem
                name={item.name}
                lastModified={item.mtime}
                isFile={item.isFile()}
                onPress={() => openItem(item)}
            />
        )
    }

    function keyExtractor(item: ReadDirItem, index: number) {
        return index.toString()
    }

    function openItem(item: ReadDirItem) {
        const isFile = item.isFile()

        if (isFile) {
            openFile(item.path)
        } else {
            openDirectory(item.name)
        }
    }

    function openFile(filePath: string) {
        navigation.push(params.redirect, { filePath })
    }

    function openDirectory(name: string) {
        if (!pathToRead) return

        const newPathToRead = `${pathToRead}/${name}`
        setPathToRead(newPathToRead)
    }

    async function readFolder() {
        if (!pathToRead) return
        if (pathToRead.includes(Constants.fullPathRootExternal)) {
            await createAllFolders()
        }

        RNFS.readDir(pathToRead)
            .then(content => setPathContent(content))
            .catch(error => {
                log.error(`Error reading folder "${pathToRead}". Error: ${stringifyError(error)}`)
                Alert.alert(
                    translate("warn"),
                    translate("FileExplorer_errorReadingFolder_text")
                )
            })
    }


    useEffect(() => {
        readFolder()
    }, [pathToRead])


    return (
        <Screen>
            <FileExplorerHeader goBack={goBackHeader} />

            {!pathToRead && (
                <Fragment>
                    <List.Item
                        left={() => <List.Icon icon={"cellphone"} />}
                        title={translate("FileExplorer_internalStorage_title")}
                        description={translate("FileExplorer_internalStorage_text")}
                        onPress={() => setPathToRead(Constants.fullPathDeviceRootInternalStorage)}
                        style={{ paddingLeft: 16 }}
                    />

                    <Divider style={{ marginLeft: 56 }} />

                    <List.Item
                        left={() => <List.Icon icon={"lock-outline"} />}
                        title={translate("FileExplorer_encryptedFiles_title")}
                        description={translate("FileExplorer_encryptedFiles_text")}
                        onPress={() => setPathToRead(Constants.fullPathEncrypted)}
                        style={{ paddingLeft: 16 }}
                    />

                    <List.Item
                        left={() => <List.Icon icon={"lock-open-variant-outline"} />}
                        title={translate("FileExplorer_decryptedFiles_title")}
                        description={translate("FileExplorer_decryptedFiles_text")}
                        onPress={() => setPathToRead(Constants.fullPathDecrypted)}
                        style={{ paddingLeft: 16 }}
                    />

                    <List.Item
                        left={() => <List.Icon icon={"file-document-arrow-right-outline"} />}
                        title={translate("FileExplorer_exportedNotes_title")}
                        description={translate("FileExplorer_exportedNotes_text")}
                        onPress={() => setPathToRead(Constants.fullPathExported)}
                        style={{ paddingLeft: 16 }}
                    />
                </Fragment>
            )}

            {!!pathToRead && pathContent.length > 0 && (
                <FlashList
                    data={pathContent}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={64}
                />
            )}

            <EmptyList
                message={translate("FileExplorer_emptyFolder")}
                visible={!!pathToRead && pathContent.length === 0}
            />
        </Screen>
    )
}
