import RNFS from "react-native-fs"

import { fullPathRoot, fullPathRootExternal, fullPathExported } from "./constant"
import { log } from "./log"


async function createRootFolder() {
    try {
        if (!await RNFS.exists(fullPathRoot)) {
            await RNFS.mkdir(fullPathRoot)
        }
    } catch (error) {
        log("ERROR", `folder-handler createRootFolder - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}

async function createRootFolderExternal() {
    try {
        if (!await RNFS.exists(fullPathRootExternal)) {
            await RNFS.mkdir(fullPathRootExternal)
        }
    } catch (error) {
        log("ERROR", `folder-handler createRootFolderExternal - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}

export async function createExportedFolder() {
    try {
        if (!await RNFS.exists(fullPathExported)) {
            await RNFS.mkdir(fullPathExported)
        }
    } catch (error) {
        log("ERROR", `folder-handler createExportedFolder - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}


export function createAllFolder() {
    // createRootFolder()
    // createRootFolderExternal()
    createExportedFolder()
}
