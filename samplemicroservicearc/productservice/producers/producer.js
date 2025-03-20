import { Kafka } from 'kafkajs'
import logger  from '../utils/logger.js';

const kafka = new Kafka({
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const produceOrder = async () => {
  await producer.connect();
  const order = {
    orderId: Math.floor(Math.random() * 10000),
    product: "Laptop",
    quantity: 1,
    price: 1200,
    status: "pending",
  };
  await producer.send({
    topic: "orders",
    messages: [{ value: JSON.stringify(order) }],
  });
  logger.info(`✅ Order sent: ${order}`);
  await producer.disconnect();
};

export default produceOrder;