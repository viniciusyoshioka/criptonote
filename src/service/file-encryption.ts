import { ToastAndroid } from "react-native"
import RNFS from "react-native-fs"

import { OldCrypto } from "./criptograph"
import { createAllFolder } from "./folder-handler"


// TODO
const encoding_file_encrypted = ""
const full_path_decrypted = ""
const full_path_encrypted = ""
const path_decrypted = ""
const path_encrypted = ""


type readCycle = {
    readingCycle: number,
    readRestByte: number,
}


type paths = {
    sourceFilePath: string,
    destinyFileName: string,
}


type functions = {
    setMessage: (newMessage: string) => void,
    setPercentage: (newPercentage: string) => void,
}


type options = {
    deleteOriginalFile: boolean,
    existentOutputFile: string,
}


async function getFileSize(sourceFilePath: string): Promise<number> {
    const fileStats = await RNFS.stat(sourceFilePath)
    return Number(fileStats.size)
}


function getReadingCycle(fileSize: number, readLength: number): readCycle {
    if (fileSize <= readLength) {
        return {
            readingCycle: 1,
            readRestByte: 0
        }
    } else {
        const readingCycle = Math.floor(fileSize / readLength)
        return {
            readingCycle: readingCycle,
            readRestByte: (fileSize - (readingCycle * readLength))
        }
    }
}


async function verifyExistentOutputFile(
    destinyFileName: string, destinyFilePath: string, existentOutputFile: string, destinyDir: string
): Promise<string | undefined> {
    async function renameFile(): Promise<string> {
        let count = 0
        let outputFilePath = `${destinyDir}/${destinyFileName}`
        while (await RNFS.exists(outputFilePath)) {   
            count += 1
            outputFilePath = `${destinyDir}/${count} - ${destinyFileName}`
        }
        return outputFilePath
    }

    if (existentOutputFile === "delete") {
        const exists = await RNFS.exists(destinyFilePath)
        if (exists) {
            await RNFS.unlink(destinyFilePath)
        }
    } else if (existentOutputFile === "rename") {
        const exists = await RNFS.exists(destinyFilePath)
        if (exists) {
            const newDestinyFilePath = await renameFile()
            return newDestinyFilePath
        }
    }
}


async function readFile(
    sourceFilePath: string, readLength: number, readPosition: number
): Promise<string> {
    return await RNFS.read(sourceFilePath, readLength, readPosition, encoding_file_encrypted)
}


export async function decryptFile(
    paths: paths, password: string, functions: functions, options: options
) {
    const { sourceFilePath, destinyFileName } = paths
    const { setMessage, setPercentage } = functions
    const { deleteOriginalFile, existentOutputFile } = options

    let readPosition = 0
    let readLength = 524288 // 524288 B = 0.5 MB / 262144 B = 0.25 MB
    let destinyFilePath = `${full_path_decrypted}/${destinyFileName}`

    setMessage("Preparando para descriptografar")
    const fileSize = await getFileSize(sourceFilePath)
    const { readingCycle, readRestByte } = getReadingCycle(fileSize, readLength)
    createAllFolder()
    const newDestinyFilePath = await verifyExistentOutputFile(
        destinyFileName, destinyFilePath, existentOutputFile, full_path_decrypted
    )
    if (newDestinyFilePath) {
        destinyFilePath = newDestinyFilePath
    }

    setMessage("Descriptografando arquivo")
    for (let cycle = 0; cycle < readingCycle; cycle++) {
        const content = await readFile(sourceFilePath, readLength, readPosition)
        const decryptedContent = OldCrypto.decrypt(content, password)
        await RNFS.write(destinyFilePath, decryptedContent, -1, encoding_file_encrypted)
        readPosition += readLength
        setPercentage(Math.floor((cycle / readingCycle) * 100).toString())
    }

    if (readRestByte !== 0) {
        readLength = readRestByte
        const content = await readFile(sourceFilePath, readLength, readPosition)
        const decryptedContent = OldCrypto.decrypt(content, password)
        await RNFS.write(destinyFilePath, decryptedContent, -1, encoding_file_encrypted)
        setPercentage("100")
    } else {
        setPercentage("100")
    }

    if (deleteOriginalFile === true) {
        await RNFS.unlink(sourceFilePath)
    }

    ToastAndroid.show(`Arquivo descriptografado para "Memória Interna/${path_decrypted}"`, 5)
}


export async function encryptFile(
    paths: paths, password: string, functions: functions, options: options
) {
    const { sourceFilePath, destinyFileName } = paths
    const { setMessage, setPercentage } = functions
    const { deleteOriginalFile, existentOutputFile } = options

    let readPosition = 0
    let readLength = 524288 // 524288 B = 0.5 MB / 262144 B = 0.25 MB
    let destinyFilePath = `${full_path_encrypted}/${destinyFileName}`

    setMessage("Preparando para criptografar")
    const fileSize = await getFileSize(sourceFilePath)
    const { readingCycle, readRestByte } = getReadingCycle(fileSize, readLength)
    createAllFolder()
    const newDestinyFilePath = await verifyExistentOutputFile(
        destinyFileName, destinyFilePath, existentOutputFile, full_path_encrypted
    )
    if (newDestinyFilePath) {
        destinyFilePath = newDestinyFilePath
    }

    setMessage("Criptografando arquivo")
    for (let cycle = 0; cycle < readingCycle; cycle++) {
        const content = await readFile(sourceFilePath, readLength, readPosition)
        const encryptedContent = OldCrypto.encrypt(content, password)
        await RNFS.write(destinyFilePath, encryptedContent, -1, encoding_file_encrypted)
        readPosition += readLength
        setPercentage(Math.floor((cycle / readingCycle) * 100).toString())
    }

    if (readRestByte !== 0) {
        readLength = readRestByte
        const content = await readFile(sourceFilePath, readLength, readPosition)
        const encryptedContent = OldCrypto.encrypt(content, password)
        await RNFS.write(destinyFilePath, encryptedContent, -1, encoding_file_encrypted)
        setPercentage("100")
    } else {
        setPercentage("100")
    }

    if (deleteOriginalFile === true) {
        await RNFS.unlink(sourceFilePath)
    }

    ToastAndroid.show(`Arquivo criptografado para "Memória Interna/${path_encrypted}"`, 5)
}
