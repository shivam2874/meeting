import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import fileUpload from "express-fileupload";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(helmet());

app.use(mongoSanitize());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(fileUpload());

app.use(compression());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(cors());

app.use("/api/v1", routes);

export default app;
