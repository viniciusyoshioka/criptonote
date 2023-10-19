import { ReactNode, useEffect } from "react"

import { log } from "@services/log"
import { LogRealmProvider, NoteRealmProvider, useLogRealm } from "../configs"


function DatabaseConsumer(props: { children?: ReactNode }) {

    const logRealm = useLogRealm()

    useEffect(() => {
        log.setRealm(logRealm)
    }, [])

    return <>{props.children}</>
}


export interface RealmProviderProps {
    children?: ReactNode
}


export function RealmProvider(props: RealmProviderProps) {
    return (
        <LogRealmProvider>
            <NoteRealmProvider>
                <DatabaseConsumer>
                    {props.children}
                </DatabaseConsumer>
            </NoteRealmProvider>
        </LogRealmProvider>
    )
}
