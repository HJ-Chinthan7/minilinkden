const express = require('express');

const dotenv = require('dotenv');

const connectDB  = require('./utils/db');

const app = express();
dotenv.config();
app.use(cors({
  origin: 'https://magical-melomakarona-51c068.netlify.app', 
  credentials: true
}));
app.options('*', cors());
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


connectDB().then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT||5000, () => console.log('Server started on port 5000'));
}).catch(err => console.log(err));
