import { Screen } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import RNFS, { ReadDirItem } from "react-native-fs"

import { EmptyList } from "@components"
import { useBackHandler } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"
import { Constants } from "@services/constant"
import { createAllFolders } from "@services/folder-handler"
import { log, stringifyError } from "@services/log"
import { FileItem } from "./FileItem"
import { FileExplorerHeader } from "./Header"


export function FileExplorer() {


    const navigation = useNavigation<NavigationParamProps<"FileExplorer">>()
    const { params } = useRoute<RouteParamProps<"FileExplorer">>()

    const [pathToRead, setPathToRead] = useState(Constants.fullPathRootExternal)
    const [pathContent, setPathContent] = useState<ReadDirItem[]>([])


    useBackHandler(() => {
        if (pathToRead === Constants.fullPathDeviceRootInternalStorage) {
            navigation.goBack()
            return true
        }

        const upDirectory = getUpDirectory()
        setPathToRead(upDirectory)
        return true
    })


    function getUpDirectory() {
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
        const newPathToRead = `${pathToRead}/${name}`
        setPathToRead(newPathToRead)
    }

    async function readFolder() {
        if (pathToRead === Constants.fullPathRootExternal) {
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
            <FileExplorerHeader />

            {pathContent.length > 0 && (
                <FlashList
                    data={pathContent}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={64}
                />
            )}

            <EmptyList
                message={translate("FileExplorer_emptyFolder")}
                visible={pathContent.length === 0}
            />
        </Screen>
    )
}
