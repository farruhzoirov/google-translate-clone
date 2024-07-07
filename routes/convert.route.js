const { Router } = require('express');
const convertHandler = require("../controller/convert.controller.js").convertHandler;

const router = Router();

router.post('/translate', convertHandler);

module.exports = router;
