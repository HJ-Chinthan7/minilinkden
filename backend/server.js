const express = require('express');

const dotenv = require('dotenv');

const connectDB  = require('./utils/db');

const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


connectDB().then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT||5000, () => console.log('Server started on port 5000'));
}).catch(err => console.log(err));
