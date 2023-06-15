import { injectable } from "inversify";
import firebase from "firebase-admin";
import { MultipartFile } from "@fastify/multipart";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class MediaRepo {
  bucket = firebase.storage().bucket("gs://taxcorner-9d897.appspot.com");

  constructor() {}

  async uploadFileToBucket(file: MultipartFile) {
    try {
      const uniqueFilename = Date.now() + "-" + file.filename;
      const fileToUpload = this.bucket.file(uniqueFilename);
      await fileToUpload.save(await file.toBuffer(), {
        contentType: file.mimetype,
      });

      const url = await fileToUpload.getSignedUrl({
        action: "read",
        expires: "03-17-9999",
      });
      return url;
    } catch (error) {
      const err = error as Error;
      return new ApiError(err.message, 500);
    }
  }
}
