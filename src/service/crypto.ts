import { NativeModules } from "react-native"


export interface CryptoProps {
    testString: (text: string, password: string) => void,
    encryptString: (text: string, password: string) => Promise<string>,
    decryptString: (text: string, password: string) => Promise<string>,

    testFile: (path: string, password: string) => void,
    encryptFile: (path: string, password: string) => Promise<string>,
    decryptFile: (path: string, password: string) => Promise<string>,
}


export const Crypto: CryptoProps = NativeModules.Crypto
