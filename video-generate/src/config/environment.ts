import dotenv from 'dotenv';
import { IEnvironment } from '../types/environment';
dotenv.config();

const environment: IEnvironment = {
    port: process.env.PORT,
    mongoDB: {
        url: process.env.DATABASE_URL || '',
    },
    parentEmail: process.env.PARENT_EMAIL || '',
    parentPassword: process.env.PARENT_PASSWORD || '',
    clientURL: process.env.CLIENT_URL || '',
    replicateApiToken: process.env.REPLICATE_API_TOKEN || '',
    apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '5'),
};

export default environment;