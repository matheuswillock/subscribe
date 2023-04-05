import Fastify from "fastify";
import { subscribedUsers, CreateNewSubscription } from './services/SubscriberService'
import cors from "@fastify/cors";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/subscribed', () => {
    return subscribedUsers()
  })

  fastify.post('/subscribed', (req, reply) => {
    return CreateNewSubscription(req, reply)
  })
  
  await fastify.listen({ port: 3333 })
}

bootstrap()