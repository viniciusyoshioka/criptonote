import { NativeModules } from "react-native"


export interface CryptoProps {
    testString: (text: string, password: string) => void,
    encryptString: (text: string, password: string) => Promise<string>,
    decryptString: (text: string, password: string) => Promise<string>,

    testFile: (filePathSource: string, password: string, filePathDestiny: string) => void,
    encryptFile: (filePathSource: string, password: string, filePathDestiny: string) => void,
    decryptFile: (filePathSource: string, password: string, filePathDestiny: string) => void,
}


export const Crypto: CryptoProps = NativeModules.Crypto
