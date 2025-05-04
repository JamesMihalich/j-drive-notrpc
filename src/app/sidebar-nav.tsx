"use client"

import { getAllFolders } from "~/server/db/queries";
import { FolderIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link"
import { folder_table } from "~/server/db/schema";
import { useMemo } from "react";

export default function SideBarNav(props : {

    allFolders : (typeof folder_table.$inferSelect)[]
    selectedFolder : number

}) {
    const sorted = useMemo(
        () => [...props.allFolders]
            .sort((a, b) => Number(a.id) - Number(b.id)),
        [props.allFolders]
    ); 

    return (
        <div>
            <nav className="space-y-1 mt-4 mx-4">
                {sorted.map((folder) => {
                    const active = Number(folder.id) === props.selectedFolder
                    return (
                        <Button
                            key={folder.id.toString()}        
                            asChild
                            variant={active ? "secondary" : "ghost"}
                            className={`w-full justify-start gap-2 h-10 ${
                            active ? "font-semibold" : ""
                            }`}
                        >
                            <Link href={`/f/${folder.id}`}>
                            <FolderIcon className="h-5 w-5" />
                            <span>{folder.name}</span>
                            </Link>
                        </Button>
                    )
                })}
            </nav>
        </div>
    )
}