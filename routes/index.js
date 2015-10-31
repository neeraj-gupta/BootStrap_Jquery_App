var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var BlogSchema = mongoose.model("Blogs");

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

router.get('/locations', function(req, res, next) {
    res.render('locations', {title: 'My Website'});
});

router.get('/blog', function(req, res, next) {
	
	if(req.query.link) {
		console.log(req.query.link);
		BlogSchema.findOne({"link": req.query.link}, function(err, doc){
			if(err){
				console.log(err);
			}
			res.json(doc);
		})
	}
	else{
		res.render('blog', {title: 'Blog'});
	}
});


module.exports = router;
