import { inject, injectable } from "inversify";
import { MediaService } from "../service/media.service";
import { ApiHelper, ApiHelperHandler, IReply } from "../utils/ApiHelper";
import { UploadProductImagesRequestI } from "../types/types";
import { isValidObjectId } from "mongoose";

@injectable()
export class MediaController {
  constructor(@inject(MediaService) private mediaService: MediaService) {}
  uploadProductImages: ApiHelperHandler<
    {},
    { isVariant: string },
    {},
    UploadProductImagesRequestI,
    IReply
  > = async (request, reply) => {
    try {
      const { params, query } = request;
      //@ts-ignore
      console.log(request);
      if (!params || !params.storeId) {
        return ApiHelper.missingParameters(reply);
      }
      const isValidStoreId = isValidObjectId(params.storeId);
      if (!isValidStoreId) {
        return ApiHelper.callFailed(reply, "Please pass valid storeId", 400);
      }
      const files = request.files();
      const response = await this.mediaService.uploadProductImages(files, {
        isVariant: query.isVariant.trim().toLowerCase() === "true",
        storeId: params.storeId,
      });
      return ApiHelper.success(reply, response);
    } catch (error) {
      let err = error as Error;
      return ApiHelper.callFailed(reply, err.message);
    }
  };
}
