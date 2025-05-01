"use client"

import { Button } from "~/components/ui/button"
import { useMemo, useState } from "react"
import {
  FileIcon,
  FolderIcon,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import { mockFiles, mockFolders } from "~/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Input } from "~/components/ui/input"


export default function HomePage() {

  const [currentFolder, setCurrentFolder] = useState<string>("root")

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder)
  }

  const handleFolderClick = (folderID : string) => {
    setCurrentFolder(folderID);
  }

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let currentID = currentFolder;

    while (currentID !== "root") {
      const folder = mockFolders.find((folder) => folder.id === currentID)
      if (folder) {
        breadcrumbs.unshift(folder)
        currentID = folder.parent ?? "root"
      } else {
        break
      }
    }

    const rootFolder = mockFolders.find(f => f.id === "root")!;
    breadcrumbs.unshift(rootFolder);

    return breadcrumbs

  }, [currentFolder])

  const handleUpload = () => {
    alert("Going to implement file uploads")
  }

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
          <Avatar className="ml-auto">
            <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="James"/>
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}

        <div className="w-64 border-r border-border border-neutral-500 bg-neutral-900 h-full flex flex-col">
          <div className="p-4">
            <Button variant= "outline" className="w-full bg-neutral-800 justify-start">
              <Plus size={16} />
              New
            </Button>

            <nav className="space-y-1 mt-5">
              <Button variant = "ghost"
                      className="w-full justify-start gap-2 hover:bg-neutral-100"
                      onClick={() => handleFolderClick("root")}
              >
                <FolderIcon className="h-5 w-5" />
                <span> My Drive </span>
              </Button>
              {mockFolders.filter((item) => item.type === "folder" && item.parent === "root").map((folder) => (
                  <Button key={folder.id} variant= "ghost" 
                          className=" w-full justify-start gap-2 hover:bg-neutral-100"
                          onClick={() => handleFolderClick(folder.id)}
                          >    
                      < FolderIcon />
                      <span>{folder.name}</span>
                  </Button>
                ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}

        <div className="flex-col bg-neutral-900 w-full">
          <div className="flex overflow-auto px-4 pt-4 pb-1 bg-neutral-900 space-x-4 w-full">
            <Button variant= "outline" className="bg-neutral-800" onClick={() => handleUpload()}>
              Upload File
            </Button>
            <Input type="search" placeholder="Search in Drive" className="w-full placeholder:text-neutral-500 focus-visible:ring-0" />
          </div>
          <div className="m-4 flex items-center">
              {breadcrumbs.map((folder, index) => (
                <div key={folder.id} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-white">/</span>}
                  <Button variant="link" className="p-0 text-white" onClick={() => handleFolderClick(folder.id)}>
                    {folder.name}
                  </Button>
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
                { getCurrentFolders().map((folder) => (
                  <FolderRow key={folder.id} folder={folder} handleFolderClick={() => {
                    handleFolderClick(folder.id);
                  }}/>
                ))}
                { getCurrentFiles().map((file) => (
                  <FileRow key={file.id} file = {file} />
                ))}

              </div>
          </div>
          </div>
        </div>
      </div>
  )
}


