const express = require("express");
const router = express.Router();

const {
    urlShortnerMaker,
    shortUrlAccess,
    getAllShortedUrl
} = require("../Controller/url.controller.js")


router.post("/shortner", urlShortnerMaker);
router.get("/:shortId", shortUrlAccess);
router.get("/all", getAllShortedUrl);

module.exports = router;