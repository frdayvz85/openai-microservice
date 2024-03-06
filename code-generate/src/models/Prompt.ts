import mongoose from 'mongoose';

export interface IPrompt extends mongoose.Document {
    userPrompt: string;
    ip: string;
    device: string;
    type: string;
}

export const PromptSchema = new mongoose.Schema(
    {
        userPrompt: {
            type: String,
            required: true,
        },
        ip: {
            type: String,
            required: false,
        },
        device: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            enum: ['code', 'video', 'music', 'image'],
            default: 'code',
            required: true,
          },
    },
    {
        timestamps: true,
    }
);

const Prompt = mongoose.model<IPrompt>('Prompt', PromptSchema);
export default Prompt;