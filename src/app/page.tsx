import { db } from "~/server/db"
import  DriveContents from "~/app/drive-contents"
import { folders as folderSchema, files as fileSchema } from "~/server/db/schema"


export default async function HomePage() {
  const files = await db.select().from(fileSchema)
  const folders = await db.select().from(folderSchema)

  return <DriveContents files = {files} folders = {folders} />

}


