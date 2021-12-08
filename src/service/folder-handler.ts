import RNFS from "react-native-fs"

import { fullPathRoot, fullPathRootExternal, fullPathExported, fullPathEncrypted, fullPathDecrypted } from "./constant"
import { log } from "./log"
import { getWritePermission } from "./permission"


async function createRootFolder() {
    const hasWritePermission = await getWritePermission()
    if (!hasWritePermission) {
        log.warn("Can't create root folder without write external storage permission")
        return
    }

    try {
        await RNFS.mkdir(fullPathRoot)
    } catch (error) {
        log.error(`folder-handler createRootFolder - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}


async function createRootFolderExternal() {
    const hasWritePermission = await getWritePermission()
    if (!hasWritePermission) {
        log.warn("Can't create external root folder without write external storage permission")
        return
    }

    try {
        await RNFS.mkdir(fullPathRootExternal)
    } catch (error) {
        log.error(`folder-handler createRootFolderExternal - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}


export async function createExportedFolder() {
    const hasWritePermission = await getWritePermission()
    if (!hasWritePermission) {
        log.warn("Can't create exported folder without write external storage permission")
        return
    }

    try {
        await RNFS.mkdir(fullPathExported)
    } catch (error) {
        log.error(`folder-handler createExportedFolder - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}


export async function createEncryptedFolder() {
    const hasWritePermission = await getWritePermission()
    if (!hasWritePermission) {
        log.warn("Can't create encrypted folder without write external storage permission")
        return
    }

    try {
        await RNFS.mkdir(fullPathEncrypted)
    } catch (error) {
        log.error(`folder-handler createEncryptedFolder - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}


export async function createDecryptedFolder() {
    const hasWritePermission = await getWritePermission()
    if (!hasWritePermission) {
        log.warn("Can't create decrypted folder without write external storage permission")
        return
    }

    try {
        await RNFS.mkdir(fullPathDecrypted)
    } catch (error) {
        log.error(`folder-handler createDecryptedFolder - Erro ao criar pasta. Mensagem: "${error}"`)
    }
}


export function createAllFolder() {
    // createRootFolder()
    // createRootFolderExternal()
    createExportedFolder()
    createEncryptedFolder()
    createDecryptedFolder()
}
