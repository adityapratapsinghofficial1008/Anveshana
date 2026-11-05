import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { router } from './routes/index.js'

export const app = express()

app.set('trust proxy', 1)

app.use(helmet())
app.use(compression())
app.use(cors({ origin: env.clientOrigins, methods: ['GET', 'POST'] }))
app.use(express.json({ limit: '10kb' }))

if (!env.isProduction) app.use(morgan('dev'))

app.use('/api', router)
app.use(notFound)
app.use(errorHandler)
