import { NativeModules } from "react-native"


export type FileEncryptionOptions = {
    fileName: string;
    sourcePath: string;
    destinationPath: string;
    password: string;
    deleteOriginalFile: boolean;
}


export type CryptoNativeModuleType = {
    sha256: (text: string) => Promise<string>;
    encryptString: (text: string, password: string) => Promise<string>;
    decryptString: (text: string, password: string) => Promise<string>;
    stopAllEncryptionService: () => void;
    encryptFileService: (options: FileEncryptionOptions) => void;
    decryptFileService: (options: FileEncryptionOptions) => void;
}


export const Crypto = NativeModules.ReactNativeCryptoModule as CryptoNativeModuleType
