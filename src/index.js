import amqp from 'amqplib';
import { insertToIndex } from './external-libs/es';

const { QUEUE_NAME } = require('./config/constant');

export const AMQPconnect = () => amqp.connect('amqp://localhost:5672');

export const receiveQueue = async () => {
  try {
    const amqpClient = await AMQPconnect();
    const channel = await amqpClient.createChannel();

    channel.assertQueue(QUEUE_NAME, {
      durable: false
    });

    console.log('[*] Waiting for messages in %s. To exit press CTRL+C', QUEUE_NAME);

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        console.log(' [x] Received %s', JSON.parse(msg.content.toString()));
        const data = JSON.parse(msg.content.toString());
        insertToIndex(data);
      },
      { noAck: true }
    );
  } catch (err) {
    throw err;
  }
};

receiveQueue();
