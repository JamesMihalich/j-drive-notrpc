import DriveContents from "~/app/drive-contents"
import { GetAllParentsForFolder, getFiles, getFolders } from "~/server/db/queries"

export default async function HomePage(props : {params : Promise <{folderId : string}> }) {

    const params = await props.params
    const parsedFolderID = parseInt(params.folderId)

    if (isNaN(parsedFolderID)) {
        return <div>Invalid Folder ID</div>

    }
        
    const [folders, files, parents] = await Promise.all([
        GetAllParentsForFolder(parsedFolderID), 
        getFiles(parsedFolderID), 
        getFolders(parsedFolderID)
    ])

    return <DriveContents files = {files} folders = {folders} parents = {parents} />
}