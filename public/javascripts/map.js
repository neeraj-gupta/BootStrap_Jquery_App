function initialize() {
    var position = new google.maps.LatLng(40.672788, -73.869573);
    var position2 = new google.maps.LatLng(17.441659, 78.498052);

    var myOptions = {
        zoom: 10,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var myOptions2 = {
        zoom: 10,
        center: position2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(
        document.getElementById("map_canvas"),
        myOptions);

    var map2 = new google.maps.Map(
        document.getElementById("map_canvas2"),
        myOptions2);

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title:"This is the place."
    });

    var marker2 = new google.maps.Marker({
        position: position2,
        map: map2,
        title:"This is the place."
    });


}