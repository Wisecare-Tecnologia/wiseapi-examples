import { fastify, FastifyReply, FastifyRequest } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import wiseApi from 'wise-api'
import 'dotenv/config'
import { z } from 'zod'

import { ConfigInterface, JoinRoomBody } from './types'

// Schema de validação das variáveis de ambiente
const envSchema = z.object({
  WISE_BASE_URL: z.string({ message: 'WISE_BASE_URL é obrigatório' }),
  WISE_DOMAIN: z.string({ message: 'WISE_DOMAIN é obrigatório' }).min(1, 'WISE_DOMAIN não pode estar vazio'),
  WISE_LOGIN: z.string({ message: 'WISE_LOGIN é obrigatório' }).min(1, 'WISE_LOGIN não pode estar vazio'),
  WISE_PASSWORD: z.string({ message: 'WISE_PASSWORD é obrigatório' }).min(1, 'WISE_PASSWORD não pode estar vazio'),
  WISE_ORG: z.string({ message: 'WISE_ORG é obrigatório' }).min(1, 'WISE_ORG não pode estar vazio'),
  WISE_ORG_UNIT: z.string({ message: 'WISE_ORG_UNIT é obrigatório' }).min(1, 'WISE_ORG_UNIT não pode estar vazio'),
  ROOM_OPEN_PWD: z.string({ message: 'ROOM_OPEN_PWD é obrigatório' }).min(1, 'ROOM_OPEN_PWD não pode estar vazio'),
  ROOM_JOIN_PWD: z.string({ message: 'ROOM_JOIN_PWD é obrigatório' }).min(1, 'ROOM_JOIN_PWD não pode estar vazio'),
  PORT: z.string().optional().transform(val => val ? Number(val) : 3334),
  HOST: z.string().optional().default('0.0.0.0')
})

// Validação das variáveis de ambiente
const envValidation = envSchema.safeParse(process.env)

if (!envValidation.success) {
  console.error('Erro: Variáveis de ambiente não configuradas corretamente:\n')
  envValidation.error.issues.forEach(issue => {
    console.error(`   - ${issue.path.join('.')}: ${issue.message}`)
  })
  console.error('\nDica: Copie o arquivo .env.example para .env e configure as variáveis')
  process.exit(1)
}

const env = envValidation.data

const app = fastify({
  logger: true,
})

app.register(fastifyCors, { origin: '*' })

const WiseAPIConfig: ConfigInterface = {
  baseUrl: env.WISE_BASE_URL,
  domain: env.WISE_DOMAIN,
  type: 'ORG',
  login: env.WISE_LOGIN,
  password: env.WISE_PASSWORD,
}

app.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
  const WiseAPI = await wiseApi(WiseAPIConfig);

  const room = await WiseAPI.room.create({
    org: env.WISE_ORG,
    orgUnit: env.WISE_ORG_UNIT,
    openPolicy: 'OPENPWD',
    joinPolicy: 'JOINPWD',
    joinPwd: env.ROOM_JOIN_PWD,
    openPwd: env.ROOM_OPEN_PWD,
    lobbyEnabled: true
  })

  await WiseAPI.room.open(room.short, {
    openPwd: env.ROOM_OPEN_PWD
  })

  reply.status(200).send({
    room: room.short
  })
})

app.post('/join', async (request: FastifyRequest, reply: FastifyReply) => {
  const { room, firstName, lastName, moderator, } = request.body as JoinRoomBody;

  if (!room || !firstName || !lastName) {
    reply.status(400).send({
      error: 'Body is incorrect',
    })
  }

  const WiseAPI = await wiseApi(WiseAPIConfig)

  const joinResponse = await WiseAPI.room.join(room, {
    firstName,
    lastName,
    moderator: moderator,
    joinPwd: env.ROOM_JOIN_PWD,
  })

  console.log(joinResponse)

  reply.status(200).send({
    sessionId: joinResponse.sessionId,
    sessionToken: joinResponse.sessionToken,
  })
})


app.listen({ port: env.PORT, host: env.HOST }, () => {
  console.log(`Server is running on ${env.HOST}:${env.PORT}`)
})