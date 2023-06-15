import { injectable } from "inversify";
import firebase from "firebase-admin";
import { MultipartFile } from "@fastify/multipart";

@injectable()
export class MediaRepo {
  bucket = firebase.storage().bucket("gs://taxcorner-9d897.appspot.com");

  constructor() {}

  async uploadFileToBucket(file: MultipartFile) {
    const uniqueFilename = Date.now() + "-" + file.filename;
    const response = await this.bucket
      .file(uniqueFilename)
      .save(await file.toBuffer(), {
        contentType: file.mimetype,
      });
  }
}
