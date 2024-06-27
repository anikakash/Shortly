const urlModel = require('../Model/url.model.js');

const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function isValidUrl(url) {
    const urlPattern = new RegExp('^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(url) && url.includes('.') && !url.includes(' ');
  }

function generateShortUrl() {
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * base62Chars.length);
    shortUrl += base62Chars[randomIndex];
  }
  return shortUrl;
}

async function getUniqueShortUrl() {
  let shortUrl;
  let isUnique = false;
  while (!isUnique) {
    shortUrl = generateShortUrl();
    const existingUrl = await urlModel.findOne({ shortUrl });
    if (!existingUrl) {
      isUnique = true;
    }
  }
  return shortUrl;
}

const urlShortnerMaker = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    console.log(`Received original URL: ${originalUrl}`);
    if (!isValidUrl(originalUrl)) {
      console.log("Invalid URL!");
      return res.status(400).json("Invalid URL!");
    }
    let url = await urlModel.findOne({ originalUrl });
    if (url) {
      console.log("URL already exists in the database.");
      return res.json(url);
    } else {
      const shortUrl = await getUniqueShortUrl();
      url = new urlModel({ originalUrl, shortUrl });
      await url.save();
      console.log("Short URL generated and saved.");
      return res.status(201).json(url);
    }
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ Message: error.message });
  }
};

const shortUrlAccess = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await urlModel.findOne({ shortUrl: shortId });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  urlShortnerMaker,
  shortUrlAccess,
};
