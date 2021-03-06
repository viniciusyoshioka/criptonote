/* eslint-disable @typescript-eslint/no-var-requires */
import RNFS from "react-native-fs"


// App
export const appId = "com.criptonote"
export const appName = "CriptoNote"
export const appVersion = "6.3.2"
export const appType = __DEV__ ? "beta" : "release"

// Icon
export const appIcon = require("./../image/criptonote.png")
export const appIconOutline = require("./../image/criptonote_outline.png")

// File extensions
export const exportedNoteBetaExtension = "cnbe"
export const exportedNoteReleaseExtension = "cne"
export const exportedNoteExtension = __DEV__ ? exportedNoteBetaExtension : exportedNoteReleaseExtension
export const exportedNoteExtensionList = [exportedNoteBetaExtension, exportedNoteReleaseExtension]

// Folder
// Root
export const folderRoot = appName
export const fullPathRoot = `${RNFS.CachesDirectoryPath}/${folderRoot}`
export const fullPathRootExternal = `${RNFS.ExternalStorageDirectoryPath}/Android/media/${appId}/${folderRoot}`
// Export
export const folderExported = "Exportadas"
export const relativePathExported = `${folderRoot}/${folderExported}`
export const fullPathExported = `${fullPathRootExternal}/${folderExported}`
// Encrypted
export const folderEncrypted = "Criptografados"
export const relativePathEncrypted = `${folderRoot}/${folderEncrypted}`
export const fullPathEncrypted = `${fullPathRootExternal}/${folderEncrypted}`
// Decrypted
export const folderDecrypted = "Descriptografados"
export const relativePathDecrypted = `${folderRoot}/${folderDecrypted}`
export const fullPathDecrypted = `${fullPathRootExternal}/${folderDecrypted}`

// Password key for exported notes
export const keyExportedNote = "5G0SLKxpRPfrZLegyYUqSk0i9JQev22U"

// Database
// Version
export const latestDbVersion = "1.0.0"
// Database folder
export const databaseFolder = `${RNFS.CachesDirectoryPath}/../databases`
// App database
export const appDatabaseFileName = "criptonote_database.sqlite"
export const appDatabaseFullPath = `${databaseFolder}/${appDatabaseFileName}`
// Log database
export const logDatabaseFileName = "criptonote_log.sqlite"
export const logDatabaseFullPath = `${databaseFolder}/${logDatabaseFileName}`
