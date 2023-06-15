import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { MediaController } from "../controllers/media.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import { UploadProductImagesRequestI } from "../types/types";

export default async (app: FastifyInstance) => {
  const mediaController = container.resolve<MediaController>(MediaController);

  ApiHelper.post<{}, { isVariant: string }, UploadProductImagesRequestI, {}>(
    app,
    "/upload/products/:storeId",
    mediaController.uploadProductImages.bind(mediaController)
  );
};
