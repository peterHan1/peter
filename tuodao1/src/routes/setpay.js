var express = require('express');
var router = express.Router();


// 定义网站主页的路由
router.get('/', function(req, res) {
	// res.send('Birds home page');
	res.render('setpay.html');
});


module.exports = router;