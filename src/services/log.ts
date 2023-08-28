import { Realm } from "@realm/react"
import { Alert } from "react-native"

import { LogSchema } from "@database"
import { translate } from "@locales"
import { DateService } from "./date"


export function stringifyError(error: unknown): string {
    if (typeof error === "string") {
        return error
    }

    if (error instanceof Error) {
        return `${error.name}: ${error.message}`
    }

    const stringifiedObject = JSON.stringify(error)
    if (stringifiedObject === "{}") {
        return error as string
    }

    return stringifiedObject
}


class Logger {


    private realm: Realm | undefined

    private consoleResetColor = "\x1b[m"
    private consoleInfoColor = "\x1b[96m"
    private consoleWarnColor = "\x1b[93m"
    private consoleErrorColor = "\x1b[97;41m"


    setRealm(realm: Realm) {
        this.realm = realm
    }


    critical(error: unknown) {
        const stringifiedError = stringifyError(error)

        console.error(`CRITICAL ERROR: "${stringifiedError}"`)
        if (__DEV__) {
            Alert.alert(
                translate("criticalError"),
                stringifiedError
            )
        } else {
            Alert.alert(
                translate("criticalError"),
                translate("log_alert_reportCriticalError_text")
            )
        }
    }


    private writeLog(code: string, message: string, timestamp: number) {
        if (!this.realm) {
            console.warn("Realm not set to Logger. Log not registered.")
            return
        }

        try {
            this.realm.write(() => {
                if (!this.realm) return
                this.realm.create(LogSchema, { code, message, timestamp })
            })
        } catch (error) {
            this.critical(error)
        }
    }


    debug(message: string) {
        const timestamp = Date.now()
        const logDateTime = DateService.getDateTime(new Date(timestamp))
        const code = "DEBUG".padEnd(5)

        console.log(`[${logDateTime}] ${code} - ${message}`)

        this.writeLog(code, message, timestamp)
    }

    info(message: string) {
        const timestamp = Date.now()
        const logDateTime = DateService.getDateTime(new Date(timestamp))
        const code = "INFO".padEnd(5)

        console.log(`${this.consoleInfoColor}[${logDateTime}] ${code} - ${message}${this.consoleResetColor}`)

        this.writeLog(code, message, timestamp)
    }

    warn(message: string) {
        const timestamp = Date.now()
        const logDateTime = DateService.getDateTime(new Date(timestamp))
        const code = "WARN".padEnd(5)

        console.log(`${this.consoleWarnColor}[${logDateTime}] ${code} - ${message}${this.consoleResetColor}`)

        this.writeLog(code, message, timestamp)
    }

    error(message: string) {
        const timestamp = Date.now()
        const logDateTime = DateService.getDateTime(new Date(timestamp))
        const code = "ERROR".padEnd(5)

        console.log(`${this.consoleErrorColor}[${logDateTime}] ${code} - ${message}${this.consoleResetColor}`)

        this.writeLog(code, message, timestamp)
    }
}


export const log = new Logger()
