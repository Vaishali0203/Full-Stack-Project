const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 5008;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));