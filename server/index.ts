import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { trackRouter } from './routes/tracks'
import { leaderboardRouter } from './routes/leaderboards'
import { totdRouter } from './routes/totd'
import { seasonRouter } from './routes/seasons'
import { playerRouter } from './routes/players'

const app = express()

app.use(cors())

app.use('/leaderboard', leaderboardRouter)
app.use('/totds', totdRouter)
app.use('/tracks', trackRouter)
app.use('/seasons', seasonRouter)
app.use('/players', playerRouter)

app.listen(process.env.PORT || 8080)
