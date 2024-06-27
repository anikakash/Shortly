const express = require("express");
const router = express.Router();

const {
    urlShortnerMaker,
    shortUrlAccess,
} = require("../Controller/url.controller.js")


router.post("/shortner", urlShortnerMaker);
router.get("/:shortId", shortUrlAccess);

module.exports = router;