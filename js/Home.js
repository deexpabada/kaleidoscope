$(function () {
    var canvas = $('#kaleidoscope');
    var g = canvas[0].getContext('2d');
    var width = 1000;
    var height = 650;

    var imgIndex = 0;
    var userImageArray = [];
    var imageArray = ["../images/SPACE.png", "../images/squirrel.jpg", "../images/Fries.jpg", "../images/k.jpg",  "../images/p.jpg", "../images/PaulAlt.jpg", "../images/after.png", "../images/a.jpg"];
    var shuffleArray = imageArray;

    var fullScreen = false;
    var zoomMultiplier = 1.0;

    var refreshRate = 1000 / 30;
    var animationTimer;
    var transitionTimer = null;

    var draw;
    var img = new Image();
    var imgLoading = true;

    img.onload = function() {
        imgLoading = false;
        draw();
    }

    function changeImage(newSrc) {
        img.src = newSrc;
        imgLoading = true;
        if(draw) {
            draw();
        }
    }

    changeImage(imageArray[0]);

    var shift = 0;
    var shiftDelta = 2;
    function singleFrameAnimation() {
        shift -= shiftDelta / zoomMultiplier;
        draw();
    }

    //function contains methods for only drawing the kaleidoscope
    (function () {
        var centerW = (width / 2);
        var centerH = (height / 2);
        var triLength = 150;
        var pixelBuffer = 20;
        var triHeight = Math.sqrt((triLength * triLength) - (triLength * triLength / 4));
        animationTimer = setInterval(singleFrameAnimation, refreshRate);

        draw = function draw() {
            if(imgLoading) {
                return;
            }

            if (fullScreen) {
                drawFull();
            }
            else {
                drawWithCircle();
            }
        };

        //draw the background/border
        function drawCircle() {
            var grd = g.createLinearGradient(0, 0, width, 0);
            grd.addColorStop(0, "lightgreen");
            grd.addColorStop(0.25, "navy");
            grd.addColorStop(0.5, "yellow");
            grd.addColorStop(0.75, "orange");
            grd.addColorStop(1, "red");
            g.fillStyle = grd;
            g.save();
            g.beginPath();
            g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
            g.clip();
            g.fillRect(0, 0, width, height);
            g.restore();
        }

        function drawWithCircle() {
            //todo: fix
            drawCircle();
            g.save();
            g.beginPath();
            g.arc(centerW, centerH, centerH - pixelBuffer, 0, 2 * Math.PI);
            g.clip();
            drawFull();
            g.restore();
        }

        function drawFull() {
            g.save();
            g.fillStyle = "black";
            //g.fillRect(0, 0, width, height);
            g.restore();
            g.fillStyle = g.createPattern(img, "repeat");
            g.save();
            drawMultipleHexs();
            g.restore();
        }

        function drawMultipleHexs() {
            g.translate(centerW, centerH);
            //this loop creates the start of the columns of images
            for (var t = -2; t < 6; t++) {
                g.save();
                g.translate(triLength * 1.5 * t, triHeight * t);
                //this loop actually renders the image
                for (var i = -4; i < 4; i++) {
                    g.save();
                    g.translate(0, i * 2 * triHeight);
                    drawHex();
                    g.restore();
                }
                g.restore();
            }
        }

        function drawHex() {
            for (i = 0; i < 6; i++) {
                if (i % 2 == 0) {
                    drawTriangle(shift);
                }
                if (i % 2 == 1) {
                    g.save();
                    g.scale(-1, 1);
                    drawTriangle(shift);
                    g.restore()
                }
                g.rotate(60 * Math.PI / 180);
            }
        }

        function drawTriangle(shift) {
            g.save();
            g.beginPath();
            g.moveTo(triLength, 0);
            g.lineTo(triLength / 2, triHeight);
            g.lineTo(0, 0);
            g.scale(zoomMultiplier, zoomMultiplier);
            g.translate(shift, shift);
            g.fill(); //Translate before fill but after clip, to get animation
            g.restore();
        }
    })();

    (function () {
        // switch between images
        $('.switchBtn').click(function () {
            //img.src = shuffleArray[Math.floor(Math.random() * shuffleArray.length)];
            imgIndex++;
            if (imgIndex >= shuffleArray.length) {
                imgIndex = 0;
            }
            changeImage(shuffleArray[imgIndex]);
        });

        // switch between albums
        $('.switchArrayBtn').click(function () {
            if (userImageArray.length === 0 || shuffleArray === userImageArray) {
                shuffleArray = imageArray;
            }
            else {
                shuffleArray = userImageArray;
            }
            changeImage(shuffleArray[0]);
        });

        //Zoom in
        $('.ZoomInBtn').click(function(){zoom(.1);});

        //Zoom out
        $('.ZoomOutBtn').click(function(){zoom(-.1)});

        //
        function zoom(zoomChange){
            zoomMultiplier += zoomChange;
            if(zoomMultiplier < .1){
                zoomMultiplier=.1;
            }
            else if(zoomMultiplier > 4.0){
                zoomMultiplier=4.0;
            }
            draw();
        }

        //auto-play the kaleidoscope
        $('.autoplayKaleidoBtn').click(function () {
            if (animationTimer != null) {
                clearInterval(animationTimer);
                animationTimer = null;
            }
            else {
                animationTimer = setInterval(singleFrameAnimation, refreshRate);
            }
        });


        //Party Mode Toggle
        $("#partyToggle").change(function() {
            if (this.checked) {
                partyOn();
            } else {
                partyOff();
            }
        });

        $("#closeFullscreen").click(function() {
            partyOff();
        });

        //Party Mode On
        function partyOn () {
                document.getElementById('fullScreen').style.webkitAnimation = 'bounce 0.3s infinite alternate';
                document.getElementById('fullScreen').style.mozAnimation = 'bounce 0.3s infinite alternate';
                document.getElementById('fullScreen').style.animation = 'bounce 0.3s infinite alternate';

                document.getElementById('fullScreen').innerHTML = "PARTY MODE ON!"
                document.getElementById("kaleidoscope").style.left = 0;
                if (animationTimer === null) {
                    animationTimer = setInterval(singleFrameAnimation, refreshRate);
                }
                fullScreen = !fullScreen;
                if (fullScreen) {
                    transitionTimer = setInterval(imgTransition, 3500);
                    $('.closeFullscreen').show();
                    $('.switchArrayBtn, .downloadBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label').css("right", "0");
                    $('.autoplayKaleidoBtn').css('right', '7%');
                }
                resize();
                g.clearRect(0, 0, width, height);
                draw();
            }

            // Party Mode Off
        function partyOff() {
                document.getElementById('fullScreen').style.webkitAnimation = 'bounce 0s';
                document.getElementById('fullScreen').style.mozAnimation = 'bounce 0s';
                document.getElementById('fullScreen').style.animation = 'bounce 0s';
                document.getElementById('fullScreen').innerHTML = "PARTY MODE OFF"
                fullScreen = false;
                $('.closeFullscreen').hide();
                clearInterval(transitionTimer);
                resize();
                $('.switchArrayBtn, .downloadBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label').css("right", "15%");
                $('.autoplayKaleidoBtn').css('right', '22%');
            }


        //multi-upload
        $('#MultiUpload').change(function () {
            var imageType = /^image\/.*/;
            for (var i = 0; i < document.getElementById("MultiUpload").files.length; i++) {
                var file = document.getElementById("MultiUpload").files[i];
                if (file.type.match(imageType)) {
                    readImage(file);
                } else {
                    fileDisplayArea.innerHTML = "File not supported!"
                }
            }
            alert("Upload succeed");
        });

        function readImage(file) {
            var reader = new FileReader();
            reader.onload = function () {
                userImageArray.push(reader.result);
                changeImage(userImageArray[0]);
                shuffleArray = userImageArray;
            };
            reader.readAsDataURL(file);
        }
    })();

    //shuffle the images
    function imgTransition() {
        if (imgIndex >= shuffleArray.length) {
            imgIndex = 0;
        }
        changeImage(shuffleArray[imgIndex]);
        imgIndex++;
    }

    // Download Image
    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }

    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadCanvas(this, 'kaleidoscope', 'Kaleidoscope.png');
    }, false);


    //Resize Kaleidoscope Canvas
    function resize() {
        var height = window.innerHeight;
        var width = window.innerWidth;
        var kaleidoscopeCanvas = document.querySelector('canvas');
        var origHeight = 650;
        var orgWidth = 1000;
        if (fullScreen) {
            kaleidoscopeCanvas.style.height = height;
            kaleidoscopeCanvas.style.width = width;
            kaleidoscopeCanvas.height = height;
            kaleidoscopeCanvas.width = width;
            kaleidoscopeCanvas.style.top = '.0%';
        }
        else {
            kaleidoscopeCanvas.style.width = height * 1.3;
            kaleidoscopeCanvas.style.height = height * 0.9;
            kaleidoscopeCanvas.width = orgWidth;
            kaleidoscopeCanvas.height = origHeight;
            kaleidoscopeCanvas.style.top = '10%';
        }
    }

    window.addEventListener('load', resize, false);
    window.addEventListener('resize', resize, false);

    //Change Playlist
    $(document).ready(function() {
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
    });


    //toggle autoplay button
    $(document).ready(function () {
        $("#autoplayKaleidoBtn").click(function () {
            $(".glyphicon-play").toggleClass("glyphicon-pause");
        });
    });

});

//Disable Browser Zoom
$(document).keydown(function(event) {
    if (event.ctrlKey==true || event.metaKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
    }
});


$(window).bind('mousewheel DOMMouseScroll', function (event) {
    if (event.ctrlKey == true) {
        event.preventDefault();
    }
});


