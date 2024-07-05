const express = require("express");
const router = express.Router();

const {
    urlShortner,
    shortUrlAccess,
    allShortedUrl
} = require("../Controller/url.controller.js")

router.get("/get/all", allShortedUrl);
router.post("/shortner", urlShortner);
router.get("/:shortId", shortUrlAccess);




module.exports = router;