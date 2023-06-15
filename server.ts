import fastify, { FastifyInstance } from "fastify";
import Routes from "./router";
import underPressure from "@fastify/under-pressure";
import fastifySwagger from "@fastify/swagger";
import cors from "@fastify/cors";
import "reflect-metadata";
import fastifyStatic from "@fastify/static";
import path from "path";
import { connectMongoDB } from "./mongoose.config";
import { config } from "dotenv";
import multipart from "@fastify/multipart";
import { firebaseInit } from "./firebaseInit";

// Load environment variables from .env file
config();
const PORT = parseInt(process.env.PORT || "8025");
const app: FastifyInstance = fastify({
  logger: true,
  disableRequestLogging: true,
});

const underPressureConfig = () => {
  return {
    healthCheck: async function () {
      // TODO: Add database connection check
      return true;
    },
    message: "Under Pressure 😯",
    exposeStatusRoute: "/status",
    healthCheckInterval: 5000,
  };
};

const multipartConfig = () => {
  return {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit per file
      files: 5, // Maximum 5 files allowed
    },
  };
};

const swaggerConfig = () => {
  return {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Fastify Boilerplate",
        description:
          "A full blown production ready boilerplate to build APIs with Fastify",
        version: "1.0.0",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    exposeRoute: true,
    host: "localhost",
  };
};

const fastifyStaticConfig = () => {
  console.log(path.join(__dirname, "../public"));
  return {
    root: path.join(__dirname, "../public"),
    prefix: "/public/", // specify a prefix for your static file URLs
  };
};
firebaseInit();

app.register(cors);
app.register(multipart, multipartConfig());
app.register(underPressure, underPressureConfig());
app.register(fastifySwagger, swaggerConfig());
app.register(fastifyStatic, fastifyStaticConfig());
app.register(require("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});
app.register(Routes);
connectMongoDB();
app.listen(PORT, (error, address) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
