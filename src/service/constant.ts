/* eslint-disable @typescript-eslint/no-var-requires */
import RNFS from "react-native-fs"


// App
export const appName = "CriptoNote"
export const appVersion = "4.0.1"
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
export const fullPathRootExternal = `${RNFS.ExternalStorageDirectoryPath}/${folderRoot}`
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

// File
// Log
export const fileLog = "criptonotelog.log"
export const relativePathLog = fileLog
export const fullPathLog = `${fullPathRoot}/${relativePathLog}`

// AsyncStorage
export const storageTheme = "@criptonote:theme"
export const storageNoteId = "@criptonote:note-id"
export const storageNote = "@criptonote:note"
export const storageLock = "@criptonote:lock"
export const storageLockType = "@criptonote:lock-type"

// Password key for exported notes
export const keyExportedNote = "5G0SLKxpRPfrZLegyYUqSk0i9JQev22U"
