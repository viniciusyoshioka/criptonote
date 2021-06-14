import { NativeModules } from "react-native"


export interface CryptoProps {
    testString: (text: string, password: string) => void,
    encryptString: (text: string, password: string) => Promise<string>,
    decryptString: (text: string, password: string) => Promise<string>,
}


export const Crypto: CryptoProps = NativeModules.Crypto
