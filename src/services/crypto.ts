import { NativeModules } from "react-native"


export type FileEncryptionOptions = {
    inputPath: string;
    outputPath: string;
    password: string;
    deleteOriginalFile?: boolean;
}


export type CryptoNativeModuleType = {
    encryptString: (text: string, password: string) => Promise<string>;
    decryptString: (text: string, password: string) => Promise<string>;
    stopAllEncryptionService: () => void;
    encryptFileService: (options: FileEncryptionOptions) => void;
    decryptFileService: (options: FileEncryptionOptions) => void;
}


export const Crypto = NativeModules.Crypto as CryptoNativeModuleType
