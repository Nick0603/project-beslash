let express = require('express'),
	request = require('request'),
	router = express.Router();

let getAccessToken = req => {
	const url = String().concat(
		'https://graph.facebook.com/',
		process.env.facebook_api_version,
		'/oauth/access_token?code=',
		req.query.code,
		'&client_id=',
		process.env.facebook_app_id,
		'&client_secret=',
		process.env.facebook_app_secret,
		'&redirect_uri=',
		process.env.facebook_app_redirect
	)
	
	return url
}

let isFacebookLoginDirect = req => {
	if(req.query.hasOwnProperty('code')){
		return true;
	}

	return false;
};

/* GET home page. */
router.get('/', function(req, res, next) {
	if(isFacebookLoginDirect(req)){
		request.get(getAccessToken(req), (error, response, body) => {
			console.log(body);
		})
		console.log('\n');

		return res.redirect('/');
	}
	return res.render('index', { title: '首頁' });
});

module.exports = router;