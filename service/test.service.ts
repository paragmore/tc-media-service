import { inject, injectable } from "inversify";
import { MediaRepo } from "../repo/media.repo";

@injectable()
export class MediaService {
  constructor(@inject(MediaRepo) private mediaRepo: MediaRepo) {}
}
