import { Router, Request, Response } from 'express';
import { produceMessage, consumeMessages, stopConsumer } from '../utils/kafka';
import { getCount, incrementCount } from '../utils/countManager';

const router = Router();

/**
 * @swagger
 * /kafka/produce:
 *   post:
 *     summary: Produce a message to Kafka, The message will be appended with the current count
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message produced successfully
 *       500:
 *         description: Error producing message
 */
router.post('/produce', async (req: Request, res: Response) => {
  const { topic, message } = req.body;
  try {
    const count = getCount();
    const messageWithCount = `${message}, index: ${count}`;
    const result = await produceMessage(topic as string, messageWithCount as string);
    incrementCount();
    res
      .status(200)
      .send('Message produced successfully with message index: ' + count);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(`Error producing message: ${errorMessage}`);
  }
});

/**
 * @swagger
 * /kafka/consume:
 *   get:
 *     summary: Consume messages from Kafka
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: true
 *         description: The topic to consume messages from
 *     responses:
 *       200:
 *         description: Consuming messages...
 *       500:
 *         description: Error consuming messages
 */
router.get('/consume', async (req: Request, res: Response) => {
  const { topic } = req.query;
  try {
    let messages: string[] = [];
    const timeout = 5000; // Set a timeout for the consumption process (e.g., 5 seconds)
    const startTime = Date.now();

    await consumeMessages(topic as string, (message) => {
      const messageValue = message.message.value
        ? message.message.value.toString()
        : 'null';
      console.log('Received message:', messageValue);
      messages.push(messageValue);

      // Stop consuming messages after the timeout
      if (Date.now() - startTime > timeout) {
        stopConsumer();
        res.status(200).send({ status: 'Consuming messages...', messages });
      }
    });

    // Send the messages if the timeout is reached
    setTimeout(() => {
      stopConsumer();
      res.status(200).send({ status: 'Consuming messages...', messages });
    }, timeout);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(`Error consuming messages: ${errorMessage}`);
  }
});

export default router;
