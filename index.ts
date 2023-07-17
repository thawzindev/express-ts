import express from 'express'

// import { apiRoutes } from './api/routes/route'

import apiRoutes from './api/routes/apiRoutes'
import bodyParser from 'body-parser'
import 'dotenv/config'
import './api/database/db'
import 'dotenv/config'

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api', apiRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
