import express, { Express, NextFunction, Request, Response } from "express";
import os from "os";
import OpenAI from "openai";
import cors from "cors";
import morgan from "morgan";
import environment from "./config/environment";
import Prompt from "./models/Prompt";
import limiter from "./utils/apiRateLimit";

const openai = new OpenAI({
  apiKey: environment.openAIToken,
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
  const message = `API is working as expected -code generate: ${os.hostname()}`;
  console.log(message);
  res.send(message);
});

app.post("/code", limiter, async (req: Request, res: Response) => {
  try {
    const messages = req.body.messages;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
        },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(req.socket);

    // Save prompt to DB
    await Prompt.create({
      userPrompt: messages[messages?.length - 1]?.content,
      ip: ip,
      device: userAgent,
      type: "code",
    });

    console.log(response);
    console.log(response?.choices[0]?.message);

    res.status(200).send({
      result: response.choices[0].message,
    });
  } catch (error: any) {
    console.error("[CODE_ERROR]", error);
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
