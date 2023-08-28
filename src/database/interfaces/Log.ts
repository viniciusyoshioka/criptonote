import { Realm } from "@realm/react"


export interface LogRealm {
    id: Realm.BSON.ObjectId;
    code: string;
    message: string;
    timestamp: number;
}
