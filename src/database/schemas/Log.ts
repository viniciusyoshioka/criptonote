import { Realm } from "@realm/react"

import { LogRealm } from "../interfaces"


export class LogSchema extends Realm.Object<LogSchema> implements LogRealm {
    id = new Realm.BSON.ObjectId()
    code!: string
    message!: string
    timestamp: number = Date.now()

    static primaryKey = "id"
}
