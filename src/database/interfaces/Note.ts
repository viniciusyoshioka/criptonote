import { Realm } from "@realm/react"


export interface NoteRealm {
    id: Realm.BSON.ObjectId;
    createdAt: number;
    modifiedAt: number;
    title: string;
    text: string;
}
