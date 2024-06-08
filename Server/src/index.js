require('dotenv').config();
const connectToMongo = require("./app");
const express = require('express');
var cors = require('cors');

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

// Start the server
app.listen(port, () => {
  console.log(`Junito app listening at http://localhost:${port}`);
});
