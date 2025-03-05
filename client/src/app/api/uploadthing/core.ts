import { useParams } from "next/navigation";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  courseImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // // Set permissions and file types for this FileRoute
    // .middleware(async () => {
    //   const params = useParams();
    //   const id = params.id as string;
    //   // If you throw, the user will not be able to upload
    //   if (!id) throw new UploadThingError("Course Not Found");

    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { courseId: id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //   console.log("Upload complete for userId:", metadata.courseId);

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
