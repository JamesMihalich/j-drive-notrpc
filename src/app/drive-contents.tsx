"use client"

import {
  Settings,
} from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import { Input } from "~/components/ui/input"
import type { files_table, folder_table } from "~/server/db/schema"
import Link from "next/link"
import { SignedIn, SignInButton, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs"
import SideBarNav from "./sidebar-nav"
import { UploadButton } from "~/components/uploadthing"
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation"


export default function DriveContents(props: {
    selectedFolder : number;
    files : (typeof files_table.$inferSelect)[];
    folders : (typeof folder_table.$inferSelect)[];
    parents : (typeof folder_table.$inferSelect)[];
    allFolders : (typeof folder_table.$inferSelect)[];

}) {

  const navigate = useRouter()

  return (
    <div className="flex h-screen flex-col text-white text-foreground">
      <header className="flex h-16 items-center border-b border-neutral-500 px-6 bg-neutral-900">
        <div className="p-4 flex items-center space-x-4">
          <div className="text-lg">
            J:Drive          
          </div>
          <div className="text-base text-neutral-400 italic">
            A Practice App By James
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button>
            <Settings />
          </button>
        <div>

          <SignedOut>
              <SignInButton />
              <SignUpButton />
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>


        </div> 
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}

        <div className="w-64 border-r border-border border-neutral-500 bg-neutral-900 h-full flex flex-col">
          <SideBarNav allFolders= { props.allFolders } selectedFolder={ props.selectedFolder } />
        </div>

        {/* Main Content */}

        <div className="flex-col bg-neutral-900 w-full">
          <div className="flex overflow-auto px-4 pt-4 pb-1 bg-neutral-900 space-x-4 w-full">
            <UploadButton endpoint = "imageUploader" 
                          className="flex items-center justify-between ut-allowed-content:none" 
                          onClientUploadComplete={() => {
                            navigate.refresh()
                            // This tells Next "hey, we need updated data from the source", and the page reloads and we get the new data!"
                          }}
                          input={{
                            folderID : props.selectedFolder
                          }}/>
            <Input type="search" placeholder="Search in Drive" className="w-full h-10 ml-auto placeholder:text-neutral-500 focus-visible:ring-0" />
          </div>
          <div className="m-4 flex items-center">
              {props.parents.map((folder, index) => (
                <div key={folder.id} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-white">/</span>}
                  <Link className="p-0 text-white" href= {`/f/${folder.id}`}>
                    {folder.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-neutral-500 bg-neutral-900 mx-4">
              <div className="flex items-center p-4 gap-8 text-neutral-400">

                <div>Name</div>
                <div className="ml-auto mr-8">Modified</div>
                <div className="mr-3">Size</div>


              </div>
              <hr className="border-t border-neutral-400 mx-4" />
              <div className="flex flex-col p-4 mt-2">
                { props.folders.map((folder) => (
                  <FolderRow key={folder.id} folder={folder}/>
                ))}
                { props.files.map((file) => (
                  <FileRow key={file.id} file = {file} />
                ))}
              </div>
          </div>
          </div>
        </div>
      </div>
  )
}


