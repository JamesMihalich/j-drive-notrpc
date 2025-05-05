import DriveContents from "~/app/f/[folderId]/drive-contents"
import { GetAllParentsForFolder, getFiles, getFolders, getAllFolders } from "~/server/db/queries"

export default async function HomePage(props : {params : Promise <{folderId : string}> }) {

    const params = await props.params
    const parsedFolderID = parseInt(params.folderId)

    if (isNaN(parsedFolderID)) {
        return <div>Invalid Folder ID</div>

    }
        
    const [parents, files, folders, allFolders] = await Promise.all([
        GetAllParentsForFolder(parsedFolderID), 
        getFiles(parsedFolderID), 
        getFolders(parsedFolderID),
        getAllFolders()


    ])

    return <DriveContents files = {files} folders = {folders} parents = {parents} allFolders={allFolders} selectedFolder={parsedFolderID} />
}