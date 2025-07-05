const shortid = require('shortid');
const Url = require('../models/Url');

exports.createShortUrl = async (req, res) => {
  const { originalUrl, customSlug } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "Missing URL" });

  const shortId = customSlug || shortid.generate();
  const existing = await Url.findOne({ shortId });
  if (existing) return res.status(400).json({ error: "Slug already taken" });

  const newUrl = new Url({ originalUrl, shortId });
  await newUrl.save();

  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
};
