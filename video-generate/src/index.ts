import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import os from "os"
import Replicate from "replicate";

dotenv.config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});


const app: Express = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    const message = `API is working as expected - video generate: ${os.hostname()}`
    console.log(message)
    res.send(message);
});


app.post('/video', async (req: Request, res: Response) => {
    try {
        const prompt = req.body.prompt;

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
            {
                input: {
                    prompt,
                }
            }
        );

        console.log(response)

        res.status(200).send({
            result: response
        });

    } catch (error: any) {
        console.error('[VIDEO_ERROR]', error)
        res.status(500).send(error?.error?.message || 'Something went wrong');
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});