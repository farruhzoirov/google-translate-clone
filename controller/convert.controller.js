const { translate } = require("@vitalets/google-translate-api");

const cache = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const translateWithCache = async (text, fromLanguage, toLanguage) => {
  const cacheKey = `${fromLanguage}-${toLanguage}-${text}`;

  if (cache.has(cacheKey)) {
    console.log('Serving from cache');
    return cache.get(cacheKey);
  }

  const result = await translate(text, {
    from: fromLanguage,
    to: toLanguage,
  });

  cache.set(cacheKey, result.text);
  return result.text;
};

const convertHandler = async (req, res, next) => {
  try {
    let { fromLanguage, toLanguage, text } = req.body;
    console.log(req.body);

    if (!fromLanguage || !toLanguage || !text) {
      return res.status(400).send({
        ok: false,
        message: "Invalid data",
      });
    }

    const translatedText = await translateWithCache(text, fromLanguage, toLanguage);

    res.status(200).json({
      ok: true,
      message: "Text translated successfully",
      translatedText: translatedText,
    });
  } catch (error) {
    console.error("Translation error:", error);
    if (error.name === 'TooManyRequestsError') {
      res.status(429).json({
        ok: false,
        message: "Too many requests",
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "An error occurred during translation",
      });
    }
  }
};

module.exports = { convertHandler };
