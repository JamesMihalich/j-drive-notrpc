"use client"



import { Button } from "~/components/ui/button"
import { useState } from "react"
import {
  FileIcon,
  FolderIcon,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Input } from "~/components/ui/input"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"



interface Item {
  id: string
  name: string
  type: "folder" | "file"
  parent: string | null
  url?: string
  size?: string
  modified: Date
  icon?: React.ReactNode
}

const rootState : Item = {
    id: "root",
    name: "My Drive",
    type: "folder",
    parent: null,
    modified: new Date("2023-12-01"),
    icon: <FolderIcon className="h-5 w-5" />,
}

const mockData: Item[] = [
  {
    id: "folder1",
    name: "Work Documents",
    type: "folder",
    parent: "root",
    modified: new Date("2023-12-10"),
    icon: <FolderIcon className="h-5 w-5" />,
  },
  {
    id: "folder2",
    name: "Personal",
    type: "folder",
    parent: "root",
    modified: new Date("2023-12-15"),
    icon: <FolderIcon className="h-5 w-5" />,
  },
  {
    id: "folder3",
    name: "Projects",
    type: "folder",
    parent: "folder1",
    modified: new Date("2023-12-20"),
    icon: <FolderIcon className="h-5 w-5" />,
  },
  {
    id: "file1",
    name: "Quarterly Report.pdf",
    type: "file",
    parent: "folder1",
    url: "#",
    size: "2.4 MB",
    modified: new Date("2023-12-18"),
    icon: <FileIcon className="h-5 w-5 text-gray-400" />,
  },
  {
    id: "file2",
    name: "Meeting Notes.docx",
    type: "file",
    parent: "folder1",
    url: "#",
    size: "1.2 MB",
    modified: new Date("2023-12-22"),
    icon: <FileIcon className="h-5 w-5 text-blue-400" />,
  },
  {
    id: "file3",
    name: "Budget.xlsx",
    type: "file",
    parent: "folder3",
    url: "#",
    size: "3.5 MB",
    modified: new Date("2023-12-25"),
    icon: <FileIcon className="h-5 w-5 text-green-400" />,
  },
  {
    id: "file4",
    name: "Vacation Photos.zip",
    type: "file",
    parent: "folder2",
    url: "#",
    size: "156 MB",
    modified: new Date("2023-12-28"),
    icon: <FileIcon className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: "file5",
    name: "Resume.pdf",
    type: "file",
    parent: "folder2",
    url: "#",
    size: "420 KB",
    modified: new Date("2023-12-30"),
    icon: <FileIcon className="h-5 w-5 text-gray-400" />,
  },
  {
    id: "file6",
    name: "Project Proposal.pptx",
    type: "file",
    parent: "folder3",
    url: "#",
    size: "5.8 MB",
    modified: new Date("2024-01-02"),
    icon: <FileIcon className="h-5 w-5 text-orange-400" />,
  },
]

export default function HomePage() {

  const [currentFolder, setCurrentFolder] = useState<string>("root")
  const [breadcrumbs, setBreadcrumbs] = useState<Item[]>([rootState])


  const navigateToFolder = (folder: Item) => {

    setCurrentFolder(folder.id)

    const newBreadcrumbs = [...breadcrumbs]
    // finds the index of the item if it is present within breadcrumbs already, otherwise it returns -1
    const existingIndex = newBreadcrumbs.findIndex((item) => item.id === folder.id)


    // tests against the function return above!
    if (existingIndex !== -1) {
      setBreadcrumbs(newBreadcrumbs.slice(0, existingIndex + 1))

    } else {
      setBreadcrumbs([...newBreadcrumbs, folder])
    }
  }
  
  // gets item in the current folder for us!
  const currentItems = mockData.filter((item) => item.parent === currentFolder)

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
                      onClick={() => navigateToFolder(rootState)}
              >
                <FolderIcon className="h-5 w-5" />
                <span> My Drive </span>
              </Button>
              {mockData.filter((item) => item.type === "folder" && item.parent === "root").map((folder) => (
                  <Button key={folder.id} variant= "ghost" 
                          className=" w-full justify-start gap-2 hover:bg-neutral-100"
                          onClick={() => navigateToFolder(folder)}
                          >    
                      {folder.icon}
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
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-white">/</span>}
                  <Button variant="link" className="p-0 text-white" onClick={() => navigateToFolder(crumb)}>
                    {crumb.name}
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
                {currentItems.length === 0 ? ( 
                  <div>This folder is empty!</div>
                ) : (
                  currentItems.map((item) => (
                    <div key = {item.id} className="flex items-center mb-4">
                      
                      <div className="w-8">{item.icon}</div>
                      { item.type === "folder" ? (
                        <button className="hover:underline text-white" onClick={() => navigateToFolder(item)}>
                          {item.name}
                        </button>
                      ):(
                        <Link href={item.url || "#"} className="hover:underline">
                          {item.name}
                        </Link>
                      )}

                      <div className="text-sm text-neutral-100 ml-auto">
                        {formatDistanceToNow(item.modified, { addSuffix: true })}
                      </div>  

                      <div className="ml-5 w-17 text-right whitespace-nowrap">
                        {item.size ?? ""}
                      </div>
                    </div>
                  )))
                }  
              </div>
          </div>
          </div>
        </div>
      </div>
  )
}


