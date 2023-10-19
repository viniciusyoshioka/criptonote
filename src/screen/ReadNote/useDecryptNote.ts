import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { Crypto } from "@services/crypto"
import { log, stringifyError } from "@services/log"


export type DecryptNoteResponse = {
    isLoading: boolean
    decryptedNote?: string
    error?: string
}


export function useDecryptNote(encryptedNote: string, password: string): DecryptNoteResponse {


    const navigation = useNavigation<NavigationParamProps<"ReadNote">>()

    const [isLoading, setIsLoading] = useState(true)
    const [decryptedNote, setDecryptedNote] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()


    useEffect(() => {
        if (password.trim().length === 0) {
            setIsLoading(false)
            setDecryptedNote(encryptedNote)
            return
        }

        Crypto.decryptString(encryptedNote, password)
            .then(content => {
                setDecryptedNote(content)
            })
            .catch(err => {
                log.error(`Error decrypting note content: ${stringifyError(err)}`)
                Alert.alert(
                    translate("warn"),
                    translate("ReadNote_alert_errorDecryptingNote_text"),
                    [
                        { text: translate("ok"), onPress: navigation.goBack }
                    ]
                )
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])


    return { isLoading, decryptedNote, error }
}
