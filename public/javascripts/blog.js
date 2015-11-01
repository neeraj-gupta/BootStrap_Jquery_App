$(function(){
	$(".prev-blog-links-container li a ").on("click", loadBlogContent);
	//load first blog content on page load
    if($(".prev-blog-links-container li").first()[0] !== undefined){
        $(".prev-blog-links-container li").first()[0].children[0].click();
    }

    $('#get-whitepaper-btn').click(function(e) {

        downloadFile(e);
    });
});

function loadBlogContent(){
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

function downloadFile(e) {
    //$.ajax({url:'/download/' + name, type:'GET'});

    var name = $('#myModalLabel').html();
    name = name + '.pdf';

    e.preventDefault();
    window.location.href = '/download/' + name;
}
