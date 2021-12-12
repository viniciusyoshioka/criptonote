import { NativeModules } from "react-native"

import { log } from "./log"
import { getWritePermission } from "./permission"


const CryptoNativeModule = NativeModules.Crypto


export type EncryptionServiceOptions = {
    deleteOriginalFile: boolean,
}


export async function encryptString(text: string, password: string): Promise<string> {
    return await CryptoNativeModule.encryptString(text, password)
}

export async function decryptString(text: string, password: string): Promise<string> {
    return await CryptoNativeModule.decryptString(text, password)
}


export function stopAllEncryptionService() {
    CryptoNativeModule.stopAllEncryptionService()
}

export function encryptFileService(
    inputPath: string,
    outputPath: string,
    password: string,
    options?: EncryptionServiceOptions
) {
    getWritePermission()
        .then((hasPermission: boolean) => {
            if (hasPermission) {
                CryptoNativeModule.encryptFileService(inputPath, outputPath, password, options ? options : null)
                return
            }
            log.warn("Can not start encryptFileService without WRITE_EXTERNAL_STORAGE permission")
        })
}

export function decryptFileService(
    inputPath: string,
    outputPath: string,
    password: string,
    options?: EncryptionServiceOptions
) {
    getWritePermission()
        .then((hasPermission: boolean) => {
            if (hasPermission) {
                CryptoNativeModule.decryptFileService(inputPath, outputPath, password, options ? options : null)
                return
            }
            log.warn("Can not start decryptFileService without WRITE_EXTERNAL_STORAGE permission")
        })
}
