
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'test' | 'production';
        SERVERLESS_ACCESS_KEY: string;
      
        APP_URL: string;
        APP_PORT: string;
      
        AWS_REGION: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_ENDPOINT: string;
      
        KAFKA_BROKER: string;
        KAFKA_CLIENT_ID: string;
        KAFKA_GROUP_ID: string;
        KAFKA_TOPIC: string;
      
        LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    }
  }
}