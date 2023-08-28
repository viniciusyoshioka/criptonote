import RNFS from "react-native-fs"

import { Constants } from "./constant"
import { log, stringifyError } from "./log"
import { getWritePermission } from "./permission"


export async function createAllFolders() {
    const hasWritePermission = await getWritePermission()
    if (!hasWritePermission) {
        log.warn("Can't create all folders without write external storage permission")
        return
    }

    try {
        await RNFS.mkdir(Constants.fullPathExported)
        await RNFS.mkdir(Constants.fullPathEncrypted)
        await RNFS.mkdir(Constants.fullPathDecrypted)
        await RNFS.mkdir(Constants.fullPathTemporaryExported)
        await RNFS.mkdir(Constants.fullPathTemporaryImported)
        await RNFS.mkdir(Constants.fullPathTemporaryEncrypted)
        await RNFS.mkdir(Constants.fullPathTemporaryDecrypted)
    } catch (error) {
        log.error(`Error creating all folders: ${stringifyError(error)}`)
    }
}
