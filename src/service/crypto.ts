import { NativeModules } from "react-native"


const CryptoNativeModule = NativeModules.Crypto


export interface TestFileEncryptionResponse {
    encryptedFilePath: string,
    decryptedFilePath: string,
}

export type EncryptionServiceOptions = {
    deleteOriginalFile: boolean,
}


export async function encryptString(text: string, password: string): Promise<string> {
    return await CryptoNativeModule.encryptString(text, password)
}

export async function decryptString(text: string, password: string): Promise<string> {
    return await CryptoNativeModule.decryptString(text, password)
}

export async function testString(text: string, password: string): Promise<boolean> {
    return await CryptoNativeModule.testString(text, password)
}


export async function testFile(filePath: string, password: string): Promise<TestFileEncryptionResponse> {
    return await CryptoNativeModule.testFile(filePath, password)
}


export function stopAllEncryptionService() {
    CryptoNativeModule.stopAllEncryptionService()
}

export function encryptFileService(
    inputPath: string, outputPath: string, password: string, options?: EncryptionServiceOptions
) {
    CryptoNativeModule.encryptFileService(inputPath, outputPath, password, options ? options : null)
}

export function decryptFileService(
    inputPath: string, outputPath: string, password: string, options?: EncryptionServiceOptions
) {
    CryptoNativeModule.decryptFileService(inputPath, outputPath, password, options ? options : null)
}
