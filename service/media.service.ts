import { inject, injectable } from "inversify";
import { MediaRepo } from "../repo/media.repo";
import { MultipartFile } from "@fastify/multipart";

@injectable()
export class MediaService {
  constructor(@inject(MediaRepo) private mediaRepo: MediaRepo) {}

  async uploadProductImages(files: AsyncIterableIterator<MultipartFile>) {
    const responses = [];
    for await (const file of files) {
      console.log(file);
      const response = await this.mediaRepo.uploadFileToBucket(file);
      responses.push(response);
    }
    return responses;
  }
}
