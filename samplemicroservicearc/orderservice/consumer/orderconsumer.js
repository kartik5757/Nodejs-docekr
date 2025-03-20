import { Kafka } from 'kafkajs'
import logger  from '../utils/logger.js';

const kafka = new Kafka({
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "order-group" });

const consumeOrders = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📥 Received Order: ${message.value.toString()}`);
    },
  });
};

export default consumeOrders;
