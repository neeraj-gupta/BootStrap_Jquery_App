var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var BlogSchema = mongoose.model("Blogs");
var path=require('path'); // get path
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index1', {title: 'My Website'});
});

router.get('/iot', function(req, res, next){
  res.render('iot', {title: 'IoT Page'});
});

router.get('/bigdata', function(req, res, next) {
    res.render('bigdata', {title: 'Big Data Page'});
});

router.get('/locations', function(req, res, next) {
    res.render('locations', {title: 'My Location'});
});

router.get('/contacts', function(req, res, next) {
    res.render('contacts', {title: 'Contact'});
});

router.get('/management', function(req, res, next) {
    res.render('management', {title: 'Management Page'});
});

router.get('/process', function(req, res, next) {
    res.render('process', {title: 'Process Page'});
});

router.get('/blog', function(req, res, next) {
	if(req.query.link) {
		console.log(req.query.link);
		BlogSchema.findOne({"link": req.query.link}, function(err, doc){
			if(err){
				console.log(err);
			}
			console.log(doc);
			res.json(doc);
		});
	}
	else{
		res.render('blog', {title: 'Blog'});
	}
});

router.get('/download/:name', function(req, res, next) {
    var dir = path.resolve(".")+'/downloads/' + req.params.name;
    res.download(dir);
});


module.exports = router;
