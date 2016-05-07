$(document).ready(function(){
    //Initialize closeFullScreen Button
    $('.closeFullscreen').hide();

    /*Open Sidebar*/
    $("#interactionBtn").click(function() {
        $("#sidebar").width("23%");
    })

    /*Close Sidebar*/
    $(".closebtn").click(function() {
        $("#sidebar").width("0%");
    })



    //Buttons Appear!
    var buttonsAppeared;
    $(".switchArrayBtn, .downloadBtn, .autoplayKaleidoBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label").hide();
    buttonsAppeared = false;
    $(".kaleidoscope").click(function () {
        if (!buttonsAppeared) {
            $(".switchArrayBtn, .downloadBtn, .autoplayKaleidoBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label").show();
            buttonsAppeared = true;
        } else {
            $(".switchArrayBtn, .downloadBtn, .autoplayKaleidoBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label").hide();
            buttonsAppeared = false;
        }
    })

    //Change Playlist
    var soundcloud = document.getElementById('soundcloud');
    $("#playlist1").click(function () {
        soundcloud.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/210079548&amp;auto_play=false&amp;' +
            'hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false';
    });
    $("#playlist2").click(function () {
        soundcloud.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/13337125&amp;' +
            'auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false'
    });
    $("#playlist3").click(function () {
        soundcloud.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2747135&amp;' +
            'auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false'
    });

    //toggle autoplay button
    $("#autoplayKaleidoBtn").click(function () {
        $(".glyphicon-play").toggleClass("glyphicon-pause");
    })

    //Disable Browser Zoom by Key
    $(document).keydown(function(event) {
        //Windows
        if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
            event.preventDefault();
        }
        //Mac
        if (event.metaKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
            event.preventDefault();
        }
    });

    //Disable Browser Zoom by Mouse
    $(window).bind('mousewheel DOMMouseScroll', function (event) {
        if (event.ctrlKey == true) {
            event.preventDefault();
        }
    });

});

