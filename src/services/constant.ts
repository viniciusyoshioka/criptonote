import RNFS from "react-native-fs"


export class Constants {

    // App
    static appId = "com.criptonote"
    static appName = "CriptoNote"
    static appVersion = "6.4.1"
    static appType = __DEV__ ? "dev" : "release"

    // Icon
    static appIconOutline = require("../image/criptonote_outline.png")

    // Folder
    // Root
    static fullPathRootExternal = `${RNFS.ExternalStorageDirectoryPath}/Android/media/${this.appId}/${this.appName}`
    static fullPathRootInternal = `${RNFS.DocumentDirectoryPath}/${this.appName}`
    // External folders
    static fullPathExported = `${this.fullPathRootExternal}/Exported`
    static fullPathEncrypted = `${this.fullPathRootExternal}/Encrypted`
    static fullPathDecrypted = `${this.fullPathRootExternal}/Decrypted`
    // Internal folders
    static fullPathTemporaryExported = `${this.fullPathRootInternal}/TemporaryExported`
    static fullPathTemporaryImported = `${this.fullPathRootInternal}/TemporaryImported`
    static fullPathTemporaryEncrypted = `${this.fullPathRootInternal}/TemporaryEncrypted`
    static fullPathTemporaryDecrypted = `${this.fullPathRootInternal}/TemporaryDecrypted`

    // Database
    static databaseFolder = RNFS.DocumentDirectoryPath
    static appDatabaseFullPath = `${this.databaseFolder}/criptonote_database.realm`
    static logDatabaseFullPath = `${this.databaseFolder}/criptonote_log.realm`
    static exportDatabaseFullPath = `${this.databaseFolder}/criptonote_export.realm`
    static importDatabaseFullPath = `${this.fullPathTemporaryImported}/criptonote_export.realm`

    // File extensions
    static exportedNotesExtension = "cne"
    static encryptedFilesExtension = "cn"
}
