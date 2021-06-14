/* eslint-disable @typescript-eslint/no-var-requires */
import RNFS from "react-native-fs"


// Development
export const appInDevelopment = true

// App
export const appName = appInDevelopment ? "CriptoNoteBeta" : "CriptoNote"
export const appFName = appInDevelopment ? "CriptoNote Beta" : "CriptoNote"
export const appVersion = "0.0.1"
export const appType = appInDevelopment ? "beta" : "release"

// Icon
const appIconPath = "./../image/"
const appIconImage = appInDevelopment ? "criptonotebeta.png" : "criptonote.png"
const appIconImageOutline = appInDevelopment ? "criptonotebeta_outline.png" : "criptonote_outline.png"
export const appIcon = require(`${appIconPath}${appIconImage}`)
export const appIconOutline = require(`${appIconPath}${appIconImageOutline}`)

// File extensions
export const exportedNoteBetaExtension = "cnbe"
export const exportedNoteReleaseExtension = "cne"
export const exportedNoteExtension = appInDevelopment ? exportedNoteBetaExtension : exportedNoteReleaseExtension
export const exportedNoteExtensionList = [exportedNoteBetaExtension, exportedNoteReleaseExtension]

// Folder
// Root
export const folderRoot = appFName
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
export const storageDebugHome = "@criptonote:debug-home"
export const storageLock = "@criptonote:lock"
