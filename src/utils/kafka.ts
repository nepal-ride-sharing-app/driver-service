// filepath: /Users/Shared/CODING-SHARED/Ride Sharing App/Rider-App-Development/services/driver-service/src/utils/kafka.ts
import {
  Kafka,
  Producer,
  Consumer,
  EachMessagePayload,
  Partitioners,
} from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: (process.env.KAFKA_BROKER || '').split(','),
  //   ssl: true,
  //   sasl:
  //     process.env.KAFKA_SASL_USERNAME && process.env.KAFKA_SASL_PASSWORD
  //       ? {
  //           mechanism: process.env.KAFKA_SASL_MECHANISM as 'plain', // 'plain' is the only supported mechanism for now
  //           username: process.env.KAFKA_SASL_USERNAME,
  //           password: process.env.KAFKA_SASL_PASSWORD,
  //         }
  //       : undefined,
});

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
