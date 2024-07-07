const { Router } = require('express');
const gettingMainPageHandler = require("../controller/get-page.controller.js");

const router = Router();

router.get('/', gettingMainPageHandler);


module.exports = router;
