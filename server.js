const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Url = require('./models/Url');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const urlRoutes = require('./routes/urlRoutes');
app.use('/api/url', urlRoutes);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const url = await Url.findOne({ shortId });
  if (url) {
    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
