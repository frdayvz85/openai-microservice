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
const fastapiIGApiUrl: string = process.env.IMAGE_GENERATE_API_URL || ""
const fastapiMGApiUrl: string = process.env.MUSIC_GENERATE_API_URL || ""

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
    timeout: 300000 // 5 mins
});

const proxyMiddlewareVideo = createProxyMiddleware({
    target: nodeVGApiUrl ? nodeVGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/video-generate': '',
    },
    timeout: 450000 // 7.5 mins
});

const proxyMiddlewareImage = createProxyMiddleware({
    target: fastapiIGApiUrl ? fastapiIGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/image-generate': '',
    },
    timeout: 450000 // 7.5 mins
});

const proxyMiddlewareMusic = createProxyMiddleware({
    target: fastapiMGApiUrl ? fastapiMGApiUrl : 'http://www.example.org',
    changeOrigin: true,
    pathRewrite: {
        '^/music-generate': '',
    },
    timeout: 450000 // 7.5 mins
});


app.use('/code-generate', proxyMiddlewareCode);
app.use('/video-generate', proxyMiddlewareVideo);
app.use('/image-generate', proxyMiddlewareImage);
app.use('/music-generate', proxyMiddlewareMusic);

app.get("/", (req: Request, res: Response) => {
    const message = `API is working as expected - API gateway: ${os.hostname()}`
    console.log(message)
    res.status(200).json({message});
});



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
