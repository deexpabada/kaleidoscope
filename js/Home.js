$(function () {
    var canvas = $('#kaleidoscope');
    var g = canvas[0].getContext('2d');

    var imgIndex = 0;
    var userImageArray = [];
    var imageArray = ["../images/SPACE.png", "../images/squirrel.jpg", "../images/Fries.jpg", "../images/j.png", "../images/k.jpg", "../images/logo.png", "../images/p.jpg", "../images/PaulAlt.jpg", "../images/after.png", "../images/a.jpg"];

    var fullscreen = false;
    var zoomMultiplier = 1.0;

    var refreshRate = 1000 / 30;
    var animationTimer;
    var transitionTimer = null;

    var draw;
    var img = new Image();
    img.src = "../images/SPACE.png";
    img.onload = draw;

    //needs to be moved still along with some other stuff
    var shift = 0;
    var shiftDelta = 2;


    function singleFrameAnimation() {
        shift -= shiftDelta / zoomMultiplier;
        draw();
    }

//function contains methods for only drawing the kaleidoscope
    (function () {

        var width = 1000;
        var height = 650;
        var centerW = (width / 2);
        var centerH = (height / 2);
        var TriLength = 150;
        var pixelBuffer = 20;

        //refactor lowercase variable names rename
        var TriHeight = Math.sqrt((TriLength * TriLength) - (TriLength * TriLength / 4));
        animationTimer = setInterval(singleFrameAnimation, refreshRate);


        draw = function draw() {
            if (fullscreen) {
                drawFull();
            }
            else {
                drawWithCircle();
            }
        };

        //the background/border
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
            g.fillRect(0, 0, width, height);
            g.restore();
            g.fillStyle = g.createPattern(img, "repeat");
            g.save();
            drawMultipleHexs();
            g.restore();
        }

        function drawMultipleHexs() {
            g.translate(centerW, centerH);
            //this loop creates the start of the columns of images
            for (var t = -4; t < 7; t++) {
                g.save();
                g.translate(TriLength * 1.5 * t, TriHeight * t);
                //this loop actually renders the image
                for (var i = -4; i < 4; i++) {
                    g.save();
                    g.translate(0, i * 2 * TriHeight);
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
            g.moveTo(TriLength, 0);
            g.lineTo(TriLength / 2, TriHeight);
            g.lineTo(0, 0);
            g.scale(zoomMultiplier, zoomMultiplier);
            g.translate(shift, shift);
            g.fill(); //Translate before fill but after clip, to get animation
            g.restore();
        }


    })();

    (function () {
        // Download Image
        function downloadCanvas(link, canvasId, filename) {
            console.log("clicked download");
            link.href = document.getElementById(canvasId).toDataURL();
            link.download = filename;
        }

        document.getElementById('downloadBtn').addEventListener('click', function () {
            downloadCanvas(this, 'kaleidoscope', 'Kaleidoscope.png');
        }, false);

        $('.switchBtn').click(function () {
            newSrc = shuffleArray[Math.floor(Math.random() * shuffleArray.length)];
            //todo: get a proper method of preventing duplicates, old one didn't work
            zoomMultiplier = 1.0;
            shift = 0;
            img.src = newSrc;
            draw();
        });


        $('.switchArrayBtn').click(function () {
            if (userImageArray.length === 0) {
                shuffleArray = imageArray;
            }
            else if (shuffleArray === userImageArray) {
                shuffleArray = imageArray;
            }
            else {
                shuffleArray = userImageArray;
            }
            img.src = shuffleArray[0];
            draw();
        });

        $('.ZoomInBtn').click(function () {
            zoomMultiplier += .1;
            if (zoomMultiplier > 4.0) {
                zoomMultiplier = 4.0;
            }
            draw();
        });

        $('.ZoomOutBtn').click(function () {
            zoomMultiplier -= .1;
            if (zoomMultiplier < 0.1) {
                zoomMultiplier = .1;
            }
            draw();
        });

        $('.autoplayKaleidoBtn').click(function () {
            if (animationTimer != null) {
                clearInterval(animationTimer);
                animationTimer = null;
            }
            else {
                animationTimer = setInterval(singleFrameAnimation, refreshRate);
            }
            if (transitionTimer != null) {
                clearInterval(transitionTimer);
                transitionTimer = null;
            }
            else if (userImageArray.length > 0) {
                transitionTimer = setInterval(imgTransition, 3500);
            }
        });

        $('.fullBtn').click(function () {
            fullscreen = !fullscreen;
            if (fullscreen) {
                document.getElementById("kaleidoscope").style.left = 0;
                transitionTimer = setInterval(imgTransition, 3500);
                $('.closeFullscreen').show();
                $('.switchArrayBtn, .downloadBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label').css("right", "0");
                $('.autoplayKaleidoBtn').css('right', '7%');
            }
            else {
                document.getElementById("kaleidoscope").style.left = "0";
                clearInterval(transitionTimer);
                $('.closeFullscreen').hide();
                $('.switchArrayBtn, .downloadBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label').css("right", "15%");
                $('.autoplayKaleidoBtn').css('right', '25%');
            }
            resize();
            g.clearRect(0, 0, width, height);
            draw();
        });


        $('.closeFullscreen').click(function () {
            fullscreen = false;
            $('.closeFullscreen').hide();
            clearInterval(transitionTimer);
            resize();
            $('.switchArrayBtn, .downloadBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label').css("right", "15%");
            $('.autoplayKaleidoBtn').css('right', '22%');
        });

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
    })();

    //REALLY not sure what to put here at all
    function imgTransition() {
        if (imgIndex >= shuffleArray.length) {
            imgIndex = 0;
        }
        img.src = shuffleArray[imgIndex];
        draw();
        imgIndex++;
        console.log(imgIndex);
    }

//multiple-image upload
    function readImage(file) {
        var reader = new FileReader();
        reader.onload = function () {
            userImageArray.push(reader.result);
            img.src = userImageArray[0];
        };
        reader.readAsDataURL(file);
    }


//need more work here
    var shuffleArray;
    if (userImageArray.length > 1) {
        shuffleArray = userImageArray;
    }
    else {
        shuffleArray = imageArray;
    }




    // Download Image
    function downloadCanvas(link, canvasId, filename) {
        console.log("clicked download");
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
        if (fullscreen) {
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

//Change Soundcloud Playlist according to theme
    function changePlaylist(theme) {
        var playlist = document.getElementById('soundcloud');
        playlist.src = theme;
    }

//toggle autoplay button
    $(document).ready(function () {
        $("#autoplayKaleidoBtn").click(function () {
            $(".glyphicon-play").toggleClass("glyphicon-pause");
        });
    });

});

//Disable Browser Zoom
$(document).keydown(function(event) {
    if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
    }
    // 107 Num Key  +
    // 109 Num Key  -
    // 173 Min Key  hyphen/underscore key
    // 61 Plus key  +/= key
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {
    if (event.ctrlKey == true) {
        event.preventDefault();
    }
});