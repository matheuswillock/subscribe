import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

const createSubscribedUserBody = z.object({
  name: z.string(),
  email: z.string(),
})

interface lista {
  id: string,
  name: string,
  email: string,
}

export async function subscribedUsers(): Promise<lista[]> {
  try {
    const subscribedUsers = await prisma.subscribedUser.findMany();
    return subscribedUsers;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro interno do servidor");
  }
}

export async function CreateNewSubscription(req: FastifyRequest, reply: FastifyReply) {
  const {name, email} = createSubscribedUserBody.parse(req.body)

  try {
    await prisma.subscribedUser.create({
      data: {
        name,
        email,
      },
    });

    return reply.status(201).send({name, email})

  } catch (error: any) {
    if (error.code == "P2002") {
      return reply.status(409).send({
        message: "E-mail já existente" 
      });
    } else {
      return reply.status(500).send({message: "Erro interno do servidor"})
    }
  }
}