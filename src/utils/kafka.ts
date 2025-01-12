// filepath: /Users/Shared/CODING-SHARED/Ride Sharing App/Rider-App-Development/services/driver-service/src/utils/kafka.ts
import {
  Kafka,
  Producer,
  Consumer,
  EachMessagePayload,
  Partitioners,
  logLevel,
} from 'kafkajs';
import fs from 'fs';
import { isDevelopmentMode } from './helper';

const kafkaConfig: any = {
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: (process.env.KAFKA_BROKER || '').split(','),
  logLevel: logLevel.INFO,
};

if (!isDevelopmentMode()) {
  kafkaConfig.ssl = {
    rejectUnauthorized: false,
    ca: [
      fs.readFileSync(
        process.env.KAFKA_SSL_CA_CERT_PATH ||
          '/etc/driver-service/certs/ca.crt',
        'utf-8',
      ),
    ],
    key: fs.readFileSync(
      process.env.KAFKA_SSL_CLIENT_KEY_PATH ||
        '/etc/driver-service/certs/client.key',
      'utf-8',
    ),
    cert: fs.readFileSync(
      process.env.KAFKA_SSL_CLIENT_CERT_PATH ||
        '/etc/driver-service/certs/client.crt',
      'utf-8',
    ),
  };
  kafkaConfig.sasl = {
    mechanism: 'scram-sha-512',
    username: process.env.KAFKA_SASL_USERNAME || 'user',
    password: process.env.KAFKA_SASL_PASSWORD || 'password',
  };
}

const kafka = new Kafka(kafkaConfig);

const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const consumer: Consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || 'default-group-id',
});

export const produceMessage = async (topic: string, message: string) => {
  await producer.connect();
  await producer.send({
    topic: topic || process.env.KAFKA_TOPIC || 'default-topic',
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

export const consumeMessages = async (
  topic: string,
  onMessage: (message: EachMessagePayload) => void,
) => {
  await consumer.connect();
  await consumer.subscribe({
    topic: topic || process.env.KAFKA_TOPIC || 'default-topic',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      onMessage(payload);
    },
  });
};

export const stopConsumer = async () => {
  await consumer.disconnect();
};
