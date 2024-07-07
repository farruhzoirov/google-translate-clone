const { translate } = require("@vitalets/google-translate-api");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

    // 1000ms = 1 second
    await sleep(1000);

    const translatedText = await translate(text, {
      from: fromLanguage,
      to: toLanguage,
    });

    res.status(200).json({
      ok: true,
      message: "Text translated successfully",
      translatedText: translatedText.text,
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