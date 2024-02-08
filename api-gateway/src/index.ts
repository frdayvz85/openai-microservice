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
const nodeVGApiUrl: string = process.env.VIDEO_GENERATE_API_URL || ""

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.use(cors());
app.use(morgan('tiny'));




// Proxy routes
const proxyMiddlewareCode = createProxyMiddleware({
    target: nodeCGApiUrl ? nodeCGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/code-generate': '',
    },
});

const proxyMiddlewareVideo = createProxyMiddleware({
    target: nodeVGApiUrl ? nodeVGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/video-generate': '',
    },
});


app.use('/code-generate', proxyMiddlewareCode);
app.use('/video-generate', proxyMiddlewareVideo);

app.get("/", (req: Request, res: Response) => {
    const message = `API is working as expected - API gateway: ${os.hostname()}`
    console.log(message)
    res.send(message);
});



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
