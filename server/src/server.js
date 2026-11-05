import { app } from './app.js'
import { assertProductionEnv, env } from './config/env.js'
import { connectDatabase, disconnectDatabase } from './config/db.js'

assertProductionEnv()

const server = app.listen(env.port, async () => {
  console.log(`[server] listening on http://localhost:${env.port} (${env.nodeEnv})`)
  try {
    await connectDatabase()
  } catch (err) {
    console.error(`[server] initial database connection failed:`, err.message)
  }
})

let shuttingDown = false

async function shutdown(signal) {
  if (shuttingDown) return
  shuttingDown = true
  console.log(`[server] ${signal} received, shutting down`)

  server.close(async () => {
    await disconnectDatabase()
    process.exit(0)
  })

  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
