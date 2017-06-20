const express = require('express');
const router = express.Router();
const config = require('../config/config');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', appId: config.facebookAppId });
});

module.exports = router;
