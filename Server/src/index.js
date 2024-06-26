require('dotenv').config();
const connectToMongo = require("./app");
const express = require('express');
var cors = require('cors');
const path = require('path');
const Prompts = require('./Models/Prompts');

connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/adminAuth', require('./Routes/Admin/Admin'));
app.use('/api/contact', require('./Routes/User/Contact'));
app.use('/api/user', require('./Routes/User/User'));
app.use('/api/company', require('./Routes/User/Company'));
app.use('/api/chat', require('./Routes/User/Chat'));
app.use('/Upload', express.static(path.join(__dirname, 'Uploads')));

app.get('/welcome', (req, res) => {
  res.send('Welcome to Junito Server');
});


app.get('/searchinzamam', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).send('Query parameter is required');
    }

    const suggestions = await Prompts.find({
      'prompt.PromptsList.value': { $regex: query, $options: 'i' }
    })
    .limit(5)
    .select('prompt.PromptsList.$') // Selects only the matching elements of PromptsList
    .exec();

    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Junito app listening at http://localhost:${port}`);
});
