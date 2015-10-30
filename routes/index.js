var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'My Website'});
});

router.get('/iot', function(req, res, next){
  res.render('iot', {title: 'IoT Page'});
});

router.get('/bigdata', function(req, res, next) {
    res.render('bigdata', {title: 'My Website'});
});

module.exports = router;
