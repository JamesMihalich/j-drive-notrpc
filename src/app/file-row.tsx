import type { Folder, File } from "../lib/mock-data"
import { FolderIcon, FileIcon } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function FileRow(props : { file : File }) {
    const { file } = props
    return (
        <div className="flex items-center mb-4">
                      
        <FileIcon className="w-8" />

        <a href={file.url} className="hover:underline" target="_blank">
            {file.name}
        </a>

        <div className="text-sm text-neutral-100 ml-auto">
          {formatDistanceToNow(file.modified, { addSuffix: true })}
        </div>  

        <div className="ml-5 w-17 text-right whitespace-nowrap">
          {file.size ?? ""}
        </div>
      </div>
    )
}

export function FolderRow(props : {folder : Folder, handleFolderClick: () => void} ) {
    const { folder, handleFolderClick} = props
    return (
        <div className="flex items-center mb-4">
            <FolderIcon className="w-8" /> 

            <button className="hover:underline text-white" onClick={() => handleFolderClick()}>
                {props.folder.name}
            </button> 

        </div>

    )
}