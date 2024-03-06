export interface IEnvironment {
    port: string | undefined;
    mongoDB: {
        url: string;
    };
    parentEmail: string;
    parentPassword: string;
    clientURL: string;
    openAIToken: string;
    apiRateLimit: number;
}