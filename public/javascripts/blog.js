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

    	// create a connecion to the server
	var _socket = io.connect("http://127.0.0.1:3000");

	// handle the connected event emitted by the server when the connection is established
	_socket.on('connected', function(data){
		console.log("Msg from the server " + data);
		//start listening for the twitter streams
		if(_socket) {
			_socket.emit("ready_to_stream");
			_socket.emit("ready_to_receieve");
		}
		else {
			alert("Socket not connected");
		}
	});

	_socket.on('new_tweet', function(tweet){
		console.log(tweet.text);
		$('.feeds ul').append("<li>" + tweet.text + "</li>");
	});

	setInterval(function(){

		var original = $(".feeds ul").css('margin-top');
		original = parseInt(original.replace("px", ""));
		var newval = original - 30;
		newval = newval + "px";
		$(".feeds ul").css('margin-top', newval);
		$(".feeds ul:target").css('margin-top', newval);
	}, 1000);

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
