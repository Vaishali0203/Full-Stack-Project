const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const app = express();

const PORT = 5008;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/mydb';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', profileRoutes);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));