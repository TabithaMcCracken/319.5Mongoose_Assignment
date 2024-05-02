import express from 'express'
import 'dotenv/config'
import connectToDb from './db/conn.js'
//import mongoose from 'mongoose'

import gradeRoutes from './routes/grades.js'
// import { connect } from 'http2'

const app = express()

const PORT = process.env.PORT || 5050;

connectToDb();

app.use(express.json())

app.use('/grades', gradeRoutes)

app.get('/', (req, res) => {
    res.send('Hello! (from Server)')
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})