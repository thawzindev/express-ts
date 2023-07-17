// Import the mongoose module
const mongoose = require('mongoose')

// Define the database URL to connect to.
const url = process.env.DB_URL

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', function () {
    console.log('Mongose connected')
})

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected')
})
