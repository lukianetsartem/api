const express = require('express');
const mongoose = require('mongoose');
const app = express();

// .env import
require('dotenv/config');

// Routers connection
const authRouter = require('./routers/auth')
const documentRouter = require('./routers/document')

// Parsers
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(cookieParser())

// Database connection
mongoose.connect(process.env.DATABASE).catch(err => console.log(err))

app.use('/auth', authRouter)
app.use('/document', documentRouter)

app.listen(4000)