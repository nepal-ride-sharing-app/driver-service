export {};

type AppEnv = {
  NODE_ENV: 'development' | 'test' | 'production';
  APP_NAME: string;
  APP_URL: string;
  APP_PORT: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
};

type AwsEnv = {
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_ENDPOINT: string;
};

type RedisEnv = {
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD?: string;
  REDIS_DB: string;
};

type MysqlEnv = {
  MYSQL_HOST: string;
  MYSQL_PORT: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
};

type KafkaEnv = {
  KAFKA_BROKER: string;
  KAFKA_CLIENT_ID: string;
  KAFKA_GROUP_ID: string;
  KAFKA_TOPIC: string;
  KAFKA_SASL_USERNAME: string;
  KAFKA_SASL_PASSWORD: string;
  KAFKA_SSL_CA_CERT_PATH: string;
  KAFKA_SSL_CLIENT_CERT_PATH: string;
  KAFKA_SSL_CLIENT_KEY_PATH: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppEnv, AwsEnv, RedisEnv, MysqlEnv, KafkaEnv {
      SERVERLESS_ACCESS_KEY?: string;
    }
  }
}
