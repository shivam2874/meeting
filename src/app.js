import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import fileUpload from "express-fileupload";
import routes from "./routes/index.js";
import createHttpError from "http-errors";

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

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This Route Does Not Exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
