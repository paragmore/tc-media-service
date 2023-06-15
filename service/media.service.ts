import { inject, injectable } from "inversify";
import { MediaRepo } from "../repo/media.repo";
import { MultipartFile } from "@fastify/multipart";
import { UploadProductImagesRequestI } from "../types/types";

@injectable()
export class MediaService {
  constructor(@inject(MediaRepo) private mediaRepo: MediaRepo) {}

  async uploadProductImages(
    files: AsyncIterableIterator<MultipartFile>,
    request: { isVariant: boolean; storeId: string }
  ) {
    const responses = [];
    for await (const file of files) {
      const folder = request.isVariant
        ? `products/${request.storeId}/variants`
        : `products/${request.storeId}`;
      const response = await this.mediaRepo.uploadFileToBucket(file, folder);
      responses.push(response);
    }
    return responses;
  }
}
