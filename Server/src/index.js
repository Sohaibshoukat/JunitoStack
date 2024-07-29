require('dotenv').config();
const connectToMongo = require("./app");
const express = require('express');
var cors = require('cors');
const path = require('path');
const PromptImages = require('./Models/PromptImags');

connectToMongo();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs'); 
app.set('views',path.join(__dirname,'views'));
app.use('/assets',express.static(path.join(__dirname, 'src/assets')));
// app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
  res.render("test",{});
})

// Define routes
app.use('/api/adminAuth', require('./Routes/Admin/Admin'));
app.use('/api/contact', require('./Routes/User/Contact'));
app.use('/api/user', require('./Routes/User/User'));
app.use('/api/company', require('./Routes/User/Company'));
app.use('/api/chat', require('./Routes/User/Chat'));
app.use('/api/transaction', require('./Routes/User/Transaction'));
app.use('/src/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.get('/welcome', (req, res) => {
  res.send('Welcome to Junito Server');
});




// Start the server
app.listen(port, () => {
  console.log(`Junito app listening at http://localhost:${port}`);
});
