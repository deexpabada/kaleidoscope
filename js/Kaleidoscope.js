$(function () {
    var canvas = $('#kaleidoscope');
    var g = canvas[0].getContext('2d');
    var width = 1000;
    var height = 650;

    var imgIndex = 0;
    var userImageArray = [];
    var imageArray = ["../images/SPACE.png", "../images/Fractal1.jpg", "../images/Fractal2.jpg", "../images/k.jpg", "../images/p.jpg", "../images/PaulAlt.jpg", "../images/Lemon.jpg", "../images/a.jpg"];
    var shuffleArray = imageArray;

    var fullScreen = false;
    var zoomMultiplier = 1.0;

    var refreshRate = 1000 / 30;
    var animationTimer;
    var transitionTimer = null;

    var draw;
    var img = new Image();
    var imgLoading = true;

    img.onload = function () {
        imgLoading = false;
        draw();
    }

    function changeImage(newSrc) {
        img.src = newSrc;
        imgLoading = true;
        if (draw) {
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
            if (imgLoading) {
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
            imgIndex++;
            if (imgIndex >= shuffleArray.length) {
                imgIndex = 0;
            }
            changeImage(shuffleArray[imgIndex]);
        });

        // switch between albums
        $('.switchArrayBtn').click(function () {
            if (userImageArray.length === 0) {
                shuffleArray = imageArray;
            }
            else if(shuffleArray === userImageArray){
                shuffleArray = imageArray;
                document.getElementById('switchText').innerHTML = "Switch to <br> your album";

            }
            else {
                shuffleArray = userImageArray;
                document.getElementById('switchText').innerHTML = "Switch to <br> preset album";

            }
            changeImage(shuffleArray[0]);
        });


        //Zoom in
        $('.ZoomInBtn').click(function () {
            zoom(.1);
        });

        //Zoom out
        $('.ZoomOutBtn').click(function () {
            zoom(-.1)
        });

        //zoom function that deals with zoom in and out
        function zoom(zoomChange) {
            zoomMultiplier += zoomChange;
            if (zoomMultiplier < .1) {
                zoomMultiplier = .1;
            }
            else if (zoomMultiplier > 4.0) {
                zoomMultiplier = 4.0;
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
        $("#partyToggle").change(function () {
            if (this.checked) {
                partyOn();
            } else {
                partyOff();
            }
        });

        //button to close the full screen
        $("#closeFullscreen").click(function () {
            partyOff();
            $("#partyToggle").attr("checked", false);
        });

        //Party Mode On
        function partyOn() {
            document.getElementById('fullScreen').style.webkitAnimation = 'bounce 0.3s infinite alternate';
            document.getElementById('fullScreen').style.mozAnimation = 'bounce 0.3s infinite alternate';
            document.getElementById('fullScreen').style.animation = 'bounce 0.3s infinite alternate';
            document.getElementById('interactionBtn').style.backgroundImage = 'url("../images/mainBackground.jpg")';
            document.getElementById('interactionBtn').style.backgroundColor = '#464646';
            document.getElementById('interactionBtn').style.top = '2%';
            document.getElementById('interactionBtn').style.webkitAnimation = 'bounce 0s infinite alternate';
            document.getElementById('interactionBtn').style.mozAnimation = 'bounce 0s infinite alternate';
            document.getElementById('interactionBtn').style.animation = 'bounce 0s infinite alternate';
            document.getElementById('fullScreen').innerHTML = "PARTY MODE ON!"
            document.getElementById("kaleidoscope").style.left = 0;
            if (animationTimer === null) {
                animationTimer = setInterval(singleFrameAnimation, refreshRate);
            }
            fullScreen = !fullScreen;
            if (fullScreen) {
                transitionTimer = setInterval(imgTransition, 5000);
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
            document.getElementById('interactionBtn').style.backgroundImage = 'none';
            document.getElementById('interactionBtn').style.backgroundColor = 'transparent';
            document.getElementById('interactionBtn').style.top = '8%';
            document.getElementById('interactionBtn').style.webkitAnimation = 'bounce 0.3s infinite alternate';
            document.getElementById('interactionBtn').style.mozAnimation = 'bounce 0.3s infinite alternate';
            document.getElementById('interactionBtn').style.animation = 'bounce 0.3s infinite alternate';
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
            document.getElementById('switchText').innerHTML = "Switch to <br> preset album";
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

    document.getElementById('downloadBtn').addEventListener('click', function () {
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
})

