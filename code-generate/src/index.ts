import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import os from "os"


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


app.get("/", (req: Request, res: Response) => {
    const message = `API is working as expected: ${os.hostname()}`
    console.log(message)
    res.send(message);
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});