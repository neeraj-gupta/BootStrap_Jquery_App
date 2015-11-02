$(function(){
	$(".prev-blog-links-container li a ").on("click", loadBlogContent);
	//load first blog content on page load
    if($(".prev-blog-links-container li").first()[0] !== undefined){
        $(".prev-blog-links-container li").first()[0].children[0].click();
    }
    // download file
    $('#get-whitepaper-btn').click(function(e) {
        downloadFile(e);
    });

    $('#popup-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recepient = button.data('whatever');
        var modal = $(this);
        modal.find('.modal-title').text(recepient);
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
    var form = $('#get-whitepaper-form');

    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();

    var voidData = {
        fname: fname,
        lname: lname,
        email: email
    }

    if(!form[0].checkValidity()) {
        $('#get-whitepaper-form').find('[type="submit"]').trigger('click');
    } else {
        name = name.toLowerCase();
        name = name.replace(" ", "-");
        name = name + '.pdf';

        $.ajax({url:'/voiduser', type:'POST', data: voidData});

        e.preventDefault();
        window.location.href = '/download/' + name;
    }
}
