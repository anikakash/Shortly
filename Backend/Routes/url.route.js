const express = require("express");
const router = express.Router();

const {
    urlShortner,
    shortUrlAccess,
    getAllShortedUrl
} = require("../Controller/url.controller.js")


router.post("/shortner", urlShortner);
router.get("/:shortId", shortUrlAccess);
router.get("/get/all", getAllShortedUrl);

module.exports = router;