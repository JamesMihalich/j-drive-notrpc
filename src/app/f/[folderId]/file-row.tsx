import type { Folder, File } from "../lib/mock-data"
import { FolderIcon, FileIcon } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { folder_table, files_table } from "~/server/db/schema"

export function FileRow(props : { file : typeof files_table.$inferSelect }) {
    const { file } = props
    return (
        <div className="flex items-center mb-4">
                      
        <FileIcon className="w-8" />

        <a href={file.url} className="hover:underline" target="_blank">
            {file.name}
        </a>

        <div className="text-sm text-neutral-100 ml-auto">
          --
        </div>  

        <div className="ml-7 w-17 text-right whitespace-nowrap">
          {file.size ?? ""}
        </div>
      </div>
    )
}

export function FolderRow(props : {folder : typeof folder_table.$inferSelect } ) {
    const { folder } = props
    return (
        <div className="flex items-center mb-4">
            <FolderIcon className="w-8" /> 

            <Link className="hover:underline text-white" href={`/f/${folder.id}`}>
                {props.folder.name}
            </Link> 

        </div>

    )
}