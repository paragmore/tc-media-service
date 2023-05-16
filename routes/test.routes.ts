import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { MediaController } from "../controllers/media.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";

export default async (app: FastifyInstance) => {
  const mediaController = container.resolve<MediaController>(MediaController)

  ApiHelper.get<{}, {}, {}>(
    app,
    "/",
    mediaController.mediaController.bind(mediaController)
  );
};
