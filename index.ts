import express from 'express'
import path from 'path'

import { db } from './server/db'

const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/api/leaderboard', (req, res) => {
    const leaderboard = db.get('leaderboard').value()
    return res.send(leaderboard)
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(process.env.PORT || 8080)
