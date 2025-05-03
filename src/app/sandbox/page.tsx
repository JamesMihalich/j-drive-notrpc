import { db } from "~/server/db"
import { mockFiles, mockFolders } from "~/lib/mock-data"
import { folders, files } from "~/server/db/schema";

export default function SandboxPage() {


    return (
    <div className="flex flex-col gap-4"> SEED FUNCTION 
        <form action={async () => {
            "use server";

            console.log("sup nerds")

            const folderInsert = await db.insert(folders).values(
                mockFolders.map((folder, index) => ({
                    id: index + 1,
                    name: folder.name,
                    type: folder.type,
                    parent: index !== 0 ? 1 : null,
                }))
              );

            console.log(folderInsert)

            const fileInsert = await db.insert(files).values(
                mockFiles.map((file, index) => ({
                    id: index + 1,
                    name: file.name,
                    type: file.type,
                    parent: (index % 3) + 1,
                    url: file.url,
                    size: 50000
                }))
            )

            console.log(fileInsert)
        }}>
            <button type="submit">Seed</button>
        </form></div>
    )
}