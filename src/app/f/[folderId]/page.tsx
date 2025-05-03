import { db } from "~/server/db"
import DriveContents from "~/app/drive-contents"
import { folders as folderSchema, files as fileSchema } from "~/server/db/schema"
import { eq } from "drizzle-orm"

async function GetAllParents(folderID : number) {

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

export default async function HomePage(props : {params : Promise <{folderId : string}> }) {

    const params = await props.params
    // Defining this here tells next.js that the rest of this is a dynamic link!
    // AKA we are doing something unique to the specific user
    const parsedFolderID = parseInt(params.folderId)

    if (isNaN(parsedFolderID)) {
        return <div>Invalid Folder ID</div>

    }

    const parentsPromise = GetAllParents(parsedFolderID)

    const filesPromise = db
        .select()
        .from(fileSchema)
        .where(eq(fileSchema.parent, parsedFolderID))

    const foldersPromise = db
        .select()
        .from(folderSchema)
        .where(eq(folderSchema.parent, parsedFolderID))
        // this is saying from the table folder schema pull all folders where the parent is equal to the folder ID
        // MAKES SENSE
        // Another cool thing here, we defined the parent as the index in the schema.ts, this makes it speed way up when looking! 
        
    const [folders, files, parents] = await Promise.all([foldersPromise, filesPromise, parentsPromise])

    // we moved these to a single promise. This lets up proceed through code without waiting and parallelizes the data fetches

    return <DriveContents files = {files} folders = {folders} parents = {parents} />
}

// NOTES

// We have to define this as a dynamic route, it recieves custom data
// This custom data is dynamic so we need to await what it is to generate this page

