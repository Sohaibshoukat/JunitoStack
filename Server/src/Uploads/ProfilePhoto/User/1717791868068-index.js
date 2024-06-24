require('dotenv').config()
const connectToMongo = require("./DB");
const express = require('express')
var cors = require('cors');
const PromptImages = require('./Models/PromptImags');
// const cookieSession = require("cookie-session");


connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.post('/api/tabs', async (req, res) => {
  try {
      const tabs = req.body;
      const result = await PromptImages.insertMany(tabs);
      res.status(201).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.use('/api/adminAuth', require('./Routes/Admin/Admin'));
app.use('/api/contact', require('./Routes/User/Contact'));
app.use('/api/user', require('./Routes/User/User'));
app.use('/api/company', require('./Routes/User/Company'));
app.use('/api/chat', require('./Routes/User/Chat'));

app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

