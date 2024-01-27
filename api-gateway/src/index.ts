import os from "os"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors"
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const nodeCGApiUrl: string = process.env.CODE_GENERATE_API_URL || ""

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.use(cors());
app.use(morgan('tiny'));




// Proxy routes
const proxyMiddleware = createProxyMiddleware({
    target: nodeCGApiUrl ? nodeCGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/code-generate': '',
    },
});

app.use('/code-generate', proxyMiddleware);

app.get("/", (req: Request, res: Response) => {
    const message = `API is working as expected - API gateway: ${os.hostname()}`
    console.log(message)
    res.send(message);
});



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
