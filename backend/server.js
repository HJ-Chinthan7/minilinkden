const express = require('express');

const dotenv = require('dotenv');

const connectDB  = require('./utils/db');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());



connectDB().then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT||5000, () => console.log('Server started on port 5000'));
}).catch(err => console.log(err));
