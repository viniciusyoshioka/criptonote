/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert } from "react-native"
import { logger } from "react-native-logs"

import { LogDatabase } from "../database"
import { getDateTime } from "./date"


type transportFunctionProps = {
    msg: string;
    rawMsg: Array<string>;
    level: {
        severity: number;
        text: string;
    };
    extension?: string | null;
}


type Logger = {
    /**
     * Disable an extension
     */
    disable: (extension: string) => boolean;

    /**
     * Enable an extension
     */
    enable: (extension: string) => boolean;

    /**
     * Extend logger with a new extension
     */
    extend: (extension: string) => (...msgs: any[]) => boolean | any;

    /**
     * Return all created extensions
     */
    getExtensions: () => string[];

    /**
     * Get current log severity API
     */
    getSeverity: () => string;

    /**
     * Set log severity API
     */
    setSeverity: (level: string) => string;

    /**
     * Log @param message as debug message
     */
    debug: (message: string) => void;

    /**
     * Log @param message as info message
     */
    info: (message: string) => void;

    /**
     * Log @param message as warn message
     */
    warn: (message: string) => void;

    /**
     * Log @param message as error message
     */
    error: (message: string) => void;
}


export function logCriticalError(message: string) {
    console.log(`FALHA CRÍTICA - Erro registrando log. Mensagem: "${message}"`)
    Alert.alert(
        "FALHA CRÍTICA",
        `Erro registrando log. Mensagem: "${message}"`
    )
}


async function databaseTransport(props: transportFunctionProps) {
    try {
        let color
        switch (props.level.text) {
            case "info":
                color = "\x1b[96m"
                break
            case "warn":
                color = "\x1b[93m"
                break
            case "error":
                color = "\x1b[97;41m"
                break
            default:
                break
        }

        const datetime = getDateTime("/", ":", true)
        const level = props.level.text.toUpperCase().padEnd(5)
        const message = props.rawMsg.join(" ")

        console.log(`${color}[${datetime}] ${level} - ${message}\x1b[m`)

        await LogDatabase.insertLog(level, message)
    } catch (error) {
        logCriticalError(error as string)
    }
}


export const log = logger.createLogger({
    severity: __DEV__ ? "debug" : "warn",
    transport: databaseTransport,
    async: true,
}) as unknown as Logger
