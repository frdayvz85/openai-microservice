import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import os from "os";
import Replicate from "replicate";
import cors from "cors";
import morgan from "morgan";
import environment from "./config/environment";
import limiter from "./utils/apiRateLimit";
import Prompt from "./models/Prompt";

dotenv.config();

const replicate = new Replicate({
  auth: environment.replicateApiToken,
});

const app: Express = express();

var allowedOrigins = ["http://localhost:3000", "http://fdev-test.info"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(morgan("tiny"));
// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const message = `API is working as expected - video generate: ${os.hostname()}`;
  console.log(message);
  res.send(message);
});

app.post("/video", limiter, async (req: Request, res: Response) => {
  try {
    const prompt = req.body.prompt;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    console.log("Started to generate a video", prompt);
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
      {
        input: {
          prompt,
        },
      }
    );

    // Save prompt to DB
    await Prompt.create({
      userPrompt: prompt,
      ip: ip,
      device: userAgent,
      type: "video",
    });

    console.log(response);

    res.status(200).send({
      result: response,
    });
  } catch (error: any) {
    console.error("[VIDEO_ERROR]", error);
    res.status(500).send(error?.error?.message || "Something went wrong");
  }
});

// If API doesn't exsist
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Endpoint Not found...");
  res.status(404);
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
