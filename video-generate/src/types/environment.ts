export interface IEnvironment {
    port: string | undefined;
    mongoDB: {
        url: string;
    };
    parentEmail: string;
    parentPassword: string;
    clientURL: string;
    replicateApiToken: string;
    apiRateLimit: number;
}