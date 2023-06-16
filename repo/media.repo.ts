import { injectable } from "inversify";
import firebase from "firebase-admin";
import { MultipartFile } from "@fastify/multipart";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class MediaRepo {
  bucket = firebase.storage().bucket("gs://taxcorner-9d897.appspot.com");

  constructor() {}

  onUploadProgress(progressEvent: any) {
    console.log(progressEvent);
  }

  async uploadFileToBucket(file: MultipartFile, folderName: string) {
    try {
      const uniqueFilename = Date.now() + "-" + file.filename;
      const fileToUpload = this.bucket.file(`${folderName}/${uniqueFilename}`);
      await fileToUpload.save(await file.toBuffer(), {
        contentType: file.mimetype,
        onUploadProgress: this.onUploadProgress,
        public: true,
      });

      const url = await fileToUpload.getSignedUrl({
        action: "read",
        expires: "03-17-9999",
      });
      return { url, fileName: file.filename };
    } catch (error) {
      const err = error as Error;
      return new ApiError(err.message, 500);
    }
  }
}
