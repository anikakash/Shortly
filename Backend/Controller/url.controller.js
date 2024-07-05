const urlModel = require('../Model/url.model.js');

// String for random shortId.
const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Valid URL Checker
function isValidUrl(url) {
    const urlPattern = new RegExp('^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(url) && url.includes('.') && !url.includes(' ');
  }

  // ShortID Generator 
  // Time Complexity : O(1) in all case.
function generateShortUrl() {
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * base62Chars.length);
    shortUrl += base62Chars[randomIndex];
  }
  return shortUrl;
}

// Unique Short Checker.
// Time Complexity: Best/Average Case O(1) , Wrost Case O(n).
// ShortId 
async function getUniqueShortUrl() {
  let shortUrl;
  let isUnique = false;

  while (!isUnique) {
    shortUrl = generateShortUrl();
    const isExistingUrl = await urlModel.findOne({ shortUrl });
    if (!isExistingUrl) {
      isUnique = true;
    }
  }

  return shortUrl;
}


// API Function :
// Method: Post
// API END Point: http://localhost:8000/api/shortner

const urlShortner = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    // console.log(`Received original URL: ${originalUrl}`);

    if (!isValidUrl(originalUrl)) { // Checking is a valid URL or not
      console.log("Invalid URL!");
      return res.status(400).json("Invalid URL!");
    }

    // If url exist previously then simply return that shortId
    let url = await urlModel.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    } 
      const shortUrl = await getUniqueShortUrl();
      url = new urlModel({ originalUrl, shortUrl });
      await url.save();
      // console.log("Short URL generated and saved.");
      return res.status(201).json(url);
    
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ Message: error.message });
  }
};

const allShortedUrl = async (req, res) => {
  try {
    const urls = await urlModel.find({}).sort({ createdAt: -1 });
    console.log("URLs retrieved from database:", urls); // Log the retrieved URLs

    if (urls.length > 0) {
      return res.status(200).json(urls);
    } else {
      console.log("No URLs found in the database.");
      return res.status(404).json('URL not found');
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ Message: error.message });
  }
};


// API Function :
// Method: GET
// API END Point: http://localhost:8000/api/:shortId

const shortUrlAccess = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await urlModel.findOne({ shortUrl: shortId }); // Find shortId exist or not in DB
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};






// export api functions
module.exports = {
  urlShortner,
  shortUrlAccess,
  allShortedUrl
};
