const app = require('./src/app')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URL)
    .then(() => {

        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`App listening port: ${PORT}`);
        })

    })
    .catch((error) => {
        console.log(error.message);
    })