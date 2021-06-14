import { NativeModules } from "react-native"


export interface CryptoProps {
    testString: (text: string, password: string) => void,
    encryptString: (text: string, password: string) => Promise<string>,
    decryptString: (text: string, password: string) => Promise<string>,

    testFile: (filePathOrigin: string, password: string, filePathDestiny: string) => void,
    encryptFile: (filePathOrigin: string, password: string, filePathDestiny: string) => Promise<string>,
    decryptFile: (filePathOrigin: string, password: string, filePathDestiny: string) => Promise<string>,
}


export const Crypto: CryptoProps = NativeModules.Crypto
