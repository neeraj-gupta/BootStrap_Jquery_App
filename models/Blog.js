var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
	title: {String},
	content: {String},
	link: {String}
});

mongoose.model('Blogs', BlogSchema, 'Blogs');