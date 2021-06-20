import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native"


const CryptoNativeModule = NativeModules.Crypto
const CryptoNativeEventEmitter = new NativeEventEmitter(CryptoNativeModule)


export interface TestFileEncryptionResponse {
    encryptedFilePath: string,
    decryptedFilePath: string,
}


export interface FileEncryptionTaskParams {
    taskId: number,
    filePath: string,
    password: string,
    onProgress: (current: number, total: number) => void,
    onComplete: (fileOutputPath: string) => void,
    onError: (message: string) => void,
}


export interface FileEncryptionProgressResponse {
    current: number,
    total: number,
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


export function stopFileEncryptionTask(taskId: number) {
    CryptoNativeModule.stopFileEncryptionTask(taskId)
}


export function encryptFileTask(params: FileEncryptionTaskParams) {
    const events: Array<EmitterSubscription> = []

    const onProgressEvent = CryptoNativeEventEmitter.addListener(
        "onFileEncryptProgress",
        (response: FileEncryptionProgressResponse) => {
            params.onProgress(response.current, response.total)
        }
    )
    events.push(onProgressEvent)

    const onCompleteEvent = CryptoNativeEventEmitter.addListener(
        "onFileEncryptComplete",
        (fileOutputPath: string) => {
            params.onComplete(fileOutputPath)
            events.forEach((event) => {
                event.remove()
            })
        }
    )
    events.push(onCompleteEvent)

    const onErrorEvent = CryptoNativeEventEmitter.addListener(
        "onFileEncryptError",
        (message: string) => {
            params.onError(message)
            events.forEach((event) => {
                event.remove()
            })
        }
    )
    events.push(onErrorEvent)

    CryptoNativeModule.encryptFileTask(params.taskId, params.filePath, params.password)
        .then(() => {})
        .catch(() => {})
}

export function decryptFileTask(params: FileEncryptionTaskParams) {
    const events: Array<EmitterSubscription> = []

    const onProgressEvent = CryptoNativeEventEmitter.addListener(
        "onFileDecryptProgress",
        (response: FileEncryptionProgressResponse) => {
            params.onProgress(response.current, response.total)
        }
    )
    events.push(onProgressEvent)

    const onCompleteEvent = CryptoNativeEventEmitter.addListener(
        "onFileDecryptComplete",
        (fileOutputPath: string) => {
            params.onComplete(fileOutputPath)
            events.forEach((event) => {
                event.remove()
            })
        }
    )
    events.push(onCompleteEvent)

    const onErrorEvent = CryptoNativeEventEmitter.addListener(
        "onFileDecryptError",
        (message: string) => {
            params.onError(message)
            events.forEach((event) => {
                event.remove()
            })
        }
    )
    events.push(onErrorEvent)

    CryptoNativeModule.decryptFileTask(params.taskId, params.filePath, params.password)
        .then(() => {})
        .catch(() => {})
}
