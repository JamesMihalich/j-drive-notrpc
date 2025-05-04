import "server-only";

import { db } from "~/server/db"
import { folder_table as folderSchema, files_table as fileSchema, type DB_File } from "~/server/db/schema"
import { eq } from "drizzle-orm"

export async function GetAllParentsForFolder(folderID : number) {

    const parents = []
    let currentFolderID : number | null = folderID

    while (currentFolderID !== null) {
        const folder = await db
            .select()
            .from(folderSchema)
            .where(eq(folderSchema.id, currentFolderID))
        if (!folder[0]) {
            throw new Error("Parent folder not found!")
        }
        parents.unshift(folder[0])
        currentFolderID = folder[0]?.parent
    }
    return parents
}

export function getAllFolders() {
    return db.select().from(folderSchema)
}


export function getFiles(folderID : number) {
 return db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent, folderID))
}

export async function getFolders(folderID : number) {
    return db
        .select()
        .from(folderSchema)
        .where(eq(folderSchema.parent, folderID))
}        


export const MUTATIONS = {
    createFile : async function (input : {
        file : {
            name : string;
            size : number;
            type : string;
            url : string;
            parent : number;
        },

        userId : string

    }) {

        return await db.insert(fileSchema).values({
            ... input.file,
            parent : 1
        })
    }

        
}