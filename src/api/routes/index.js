
const express = require("express");
const router = express.Router();


router.get('/', async (_req, res, _next) => {
    res.status(200).json({
        status: "IMS Service up and running", 
        version: process.env.APP_VERSION,
        env: process.env.NODE_ENV
    });
});

module.exports = router