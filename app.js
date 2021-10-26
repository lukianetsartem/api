const express = require('express');
const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const bodyParser = require('body-parser')
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE).catch(err => console.log(err))

app.listen(4000)