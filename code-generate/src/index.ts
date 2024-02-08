import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import os from "os"
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_TOKEN,
});




const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    const message = `API is working as expected -code generate: ${os.hostname()}`
    console.log(message)
    res.send(message);
});


app.post('/code', async (req: Request, res: Response) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });


        console.log(response)
        console.log(response.choices[0].message);

        res.status(200).send({
            result: response.choices[0].message
        });

    } catch (error: any) {
        console.error('[CODE_ERROR]', error)
        res.status(500).send(error?.error?.message || 'Something went wrong');
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});