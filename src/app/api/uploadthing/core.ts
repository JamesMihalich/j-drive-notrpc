import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { MUTATIONS } from "~/server/db/queries";
import { z } from "zod"
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).input(z.object({
    folderID : z.number(),

  }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user.userId) throw new UploadThingError("Unauthorized!");

      const folder = await MUTATIONS.getFolderById(input.folderID)

      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!folder) throw new UploadThingError("Folder Not Found!")

      if (folder.ownerID !== user.userId) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError("User is not authorized!")

      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, parentID: input.folderID };
    })

  
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      await MUTATIONS.createFile( {
        file : {
            name: file.name,
            size: file.size,
            type: file.type,
            url: file.ufsUrl,
            parent: metadata.parentID
        },
        userId: metadata.userId
      })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
