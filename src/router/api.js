var express = require('express'),
	restAuth = require('./restAPI/auth.js'),
	router = express.Router();

router.get('/isLogin', restAuth.isLogin);
router.get('/getFacebookAppID', restAuth.getFacebookAppID);
router.post('/login', restAuth.login);

module.exports = router;