import { NativeModules } from "react-native"


export interface CryptoProps {
    encrypt: (text: string, password: string) => Promise<string>,
    decrypt: (text: string, password: string) => Promise<string>,
    test: (text: string, password: string) => void,
}


export const Crypto: CryptoProps = NativeModules.Crypto
