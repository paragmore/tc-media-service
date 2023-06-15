import { inject, injectable } from "inversify";
import { MediaService } from "../service/media.service";
import { ApiHelper, ApiHelperHandler, IReply } from "../utils/ApiHelper";

@injectable()
export class MediaController {
  constructor(@inject(MediaService) private mediaService: MediaService) {}
  uploadProductImages: ApiHelperHandler<{}, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    try {
      const files = request.files();

      const response = await this.mediaService.uploadProductImages(files);

      return ApiHelper.success(reply, { hello: "world" });
    } catch (error) {
      let err = error as Error;
      return ApiHelper.callFailed(reply, err.message);
    }
  };
}
