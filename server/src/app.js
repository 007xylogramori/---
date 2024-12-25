import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger.js";
import { globalLimiter } from "./utils/RateLimit.js";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

// GLOBAL MIDDLEWARES 

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(globalLimiter);
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes

import userRouter from './routes/user.routes.js'
import fileRouter from './routes/file.routes.js'
import errorHandler from "./middleware/errorHandler.middleware.js";

app.use("/api/v1/users", userRouter)
app.use("/api/v1/file", fileRouter)

app.use(errorHandler);

export { app };
