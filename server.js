const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { mongo } = require('mongoose');

const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')

const authController = require('./controllers/auth.js')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB`)
})

const port = process.env.PORT ? process.env.PORT : '3000';

app.use(express.urlencoded({extended: false}))

app.use('/auth', authController);

app.get('/', (req, res) => {
    res.render('index.ejs')
})



app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
})