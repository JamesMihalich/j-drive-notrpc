import { db } from "~/server/db"
import { mockFiles, mockFolders } from "~/lib/mock-data"
import { folder_table, files_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function SandboxPage() {


    return (
    <div className="flex flex-col gap-4"> SEED FUNCTION 
        <form action={async () => {
            "use server";

            console.log("sup nerds")

            const user = await auth()

            if (!user.userId) {
                throw new Error("User Not Found")
            }

            const folders = await db
                .select()
                .from(folder_table)
                .where(eq(folder_table.ownerID, user.userId ))

            console.log(folders)





        }}>
            <button type="submit">Seed</button>
        </form></div>
    )
}