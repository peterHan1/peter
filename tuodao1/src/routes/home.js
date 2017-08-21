var express = require('express'),
	router = express.Router();

router.get('/', function(req, res) {
	res.render('view/index.html');
});

module.exports = router;