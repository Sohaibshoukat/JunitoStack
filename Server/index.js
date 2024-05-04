require('dotenv').config()
const connectToMongo = require("./DB");
const express = require('express')
var cors = require('cors');
// const cookieSession = require("cookie-session");


connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/adminAuth', require('./Routes/Admin/Admin'));
app.use('/api/contact', require('./Routes/User/Contact'));
app.use('/api/user', require('./Routes/User/User'));
app.use('/api/company', require('./Routes/User/Company'));
// app.use('/api/worker', require('./Routes/Worker'));

app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

