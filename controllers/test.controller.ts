import { inject, injectable } from "inversify";
import { MediaService } from "../service/media.service";
import {
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";

@injectable()
export class MediaController {
  constructor(@inject(MediaService) private mediaService: MediaService) {}
  mediaController: ApiHelperHandler<{}, {}, {}, {}, IReply> =
    async (request, reply) => {
      return ApiHelper.success(reply, {hello: 'world'})
    };
}
