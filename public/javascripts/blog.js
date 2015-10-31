$(function(){

	$(".prev-blog-links-container li a ").on("click", loadBlogContent);

	console.log($(".prev-blog-links-container li").first()[0].children[0]);
	//load first blog content on page load
	$(".prev-blog-links-container li").first()[0].children[0].click();

});

function loadBlogContent(){
	alert($(this).attr('data-href'));

	var link = $(this).attr('data-href');
	$.getJSON("blog/?link=" + link, function(result){
		console.log(result);
		$("#blog-id").text(result.title);
		$("#blog-content").text(result.content);
		console.log(result);
		//load the related technology report
		//var variablename = new PDFObject({ url: "http://steve.vinoski.net/pdf/IC-Node.js.pdf" }).embed("techreport");
		var variablename = new PDFObject({ url: result.reportlink }).embed("techreport");
	});
}