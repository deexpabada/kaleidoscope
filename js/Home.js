$(function() {
    //initialize the canvas
    var canvas = $('#kaleidoscope');
    var g = canvas[0].getContext('2d');

    var timepassed = 0;
    var imgIndex = 0;
    var imgTransition = function(){
        //animationTimer = setInterval(singleFrameAnimation,100);
        //singleFrameAnimation();
        //setTimeout(imgTransition,100);
        //timepassed += 100;

        //if(timepassed >= 5000) {
        //    setTimeout(function(){fading(imageArray[imgIndex], imageArray[imgIndex+1])}, 1000);
        //    if(timepassed >= 7000){
        //        timepassed = 0;
        //    }
        //}

        function switchPic(){
            if(timepassed <= 3000){
                singleFrameAnimation();
                timepassed += 100;
                setTimeout(switchPic,100);
                console.log(timepassed);
            }
            else{
                setTimeout(function(){fading(imageArray[imgIndex], imageArray[imgIndex+1])}, 1000);
                timepassed = 0;
                imgIndex++;
                if(imgIndex == imageArray.length){
                    imgIndex = 0;
                }
                switchPic();
            }
        }
        switchPic();
    };

    function fading(img1, img2){
        g.globalAlpha = 1.0 - (timepassed - 7000)/10;
        img.src = img1;
        draw();
        g.globalAlpha = (timepassed - 7000)/10;
        img.src = img2;
        draw();
        timepassed +=100;
    };

    var userImageArray = [];
    $('#MultiUpload').change(function(){
        var imageType = /image.*/;
        //var files = document.getElementById("MultiUpload");
        for (i = 0; i < 1; i++) {
            var file = document.getElementById("MultiUpload").files[i];
            if (file.type.match(imageType)) {
                var reader = new FileReader();
                var image = reader.readAsDataURL(file);
                userImageArray.push(image);
                console.log("Added", image, "to array", userImageArray);
            } else {
                fileDisplayArea.innerHTML = "File not supported!"
            }
        }
        console.log(userImageArray);
        console.log(document.getElementById("MultiUpload").multiple);
    });


    // button to switch picture
    $('.switchBtn').click(function () {
        newSrc = imageArray[Math.floor(Math.random() * imageArray.length)];
        if(newSrc === img.src){
            newSrc = imageArray[Math.floor(Math.random() * imageArray.length)];
        }
        zoomMultiplier = 1.0;
        img.src = newSrc;
    });


    function singleFrameAnimation(){
        shift--;  //another variable keeps track of the transition amount
        draw();
    }

    $('.SquirrelBtn').click(function(){
        img.src = "../images/squirrel.jpg";
        draw();
    });

    $('.ZoomInBtn').click(function(){
        zoomMultiplier += .1;
        if(zoomMultiplier > 4.0){
            zoomMultiplier = 4.0;
        }
        draw();
    });

    $('.ZoomOutBtn').click(function(){
        zoomMultiplier -= .1;
        if(zoomMultiplier < 0.1){
            zoomMultiplier = .01;
        }
        draw();
    });

    $('.animateBtn').click(function(){
        if(animationTimer != null) {
            clearInterval(animationTimer);
            animationTimer = null;
        }
        else{
            animationTimer = setInterval(singleFrameAnimation, refreshRate);
        }
    });

    //Button Implementation

    $('.autoplayKaleidoBtn').click(function(){
        if(animationTimer == null) {
            animationTimer = setInterval(singleFrameAnimation, refreshRate);
        }
        else{
            clearInterval(animationTimer);
            animationTimer = null;
        }
    });

    //test for transition
    $('.transitionTest').click(imgTransition);
    ////


    $('.ZoomInBtn').click(function(){
        zoomMultiplier += .1;
        if(zoomMultiplier > 4.0){
            zoomMultiplier = 4.0;
        }
        draw();
    });

    $('.ZoomOutBtn').click(function(){
        zoomMultiplier -= .1;
        if(zoomMultiplier < 0.1){
            zoomMultiplier = .01;
        }
        draw();
    });


    $('#ImageUpload').change(function(){
            var file = document.getElementById("ImageUpload").files[0];
            var imageType = /image.*/;

            if (file.type.match(imageType)) {
                var reader = new FileReader();

                reader.onload = function(){
                    img.src = reader.result;
                    draw();
                    zoomMultiplier = 1.0;
                };
                reader.readAsDataURL(file);
            } else {
                fileDisplayArea.innerHTML = "File not supported!"
            }
    });

    var zoomMultiplier = 1.0;
    var shadingLensPresence = false;
    var imageArray = ["../images/SPACE.png","../images/squirrel.jpg", "../images/Fries.jpg", "../images/j.png", "../images/k.jpg","../images/a.jpg", "../images/logo.png","../images/p.jpg", "../images/PaulAlt.jpg", "../images/after.png"];
    //var animationTimer = null;
    var imgSource = "../images/SPACE.png";
    var shiftLimitMin = -120;
    var shiftLimitMax = 0;
    var toggle = false;
    var shift = 0;
    var pixelBuffer = 20;
    var width = 1000;
    var height = 650;
    var centerW = (width / 2);
    var centerH = (height / 2);
    var TriLength = 150;
    var TriHeight = Math.sqrt((TriLength * TriLength) - (TriLength * TriLength / 4));
    var refreshRate = 1000 / 20;
    var img = new Image();
    img.src = imgSource;
    function drawMultipleHexs() {
        g.translate(centerW, centerH);
        //this loop creates the start of the columns of images
        for(var t = -5; t < 10; t++) {
            g.save();
            g.translate(TriLength *1.5 * t, TriHeight * t);
            //this loop actually renders the image
            for (var i = -3; i < 4; i++) {
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
        //g.drawImage(img, -(img.width/2) +shift, -(img.height/2) + shift, img.width * zoomMultiplier, img.height * zoomMultiplier);
        g.restore();
    }

    //Draw the huge Kalei on the center
    function draw() {
        drawCircle();
        //draw hexagons in circle
        g.fillStyle = g.createPattern(img, "repeat");
        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH - pixelBuffer, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();
    }


    //the background/border
    function drawCircle(){
        var grd = g.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, "darkgrey");
        grd.addColorStop(0.25,"white");
        grd.addColorStop(0.5,"grey");
        grd.addColorStop(0.75,"black");
        grd.addColorStop(1, "Navy");
        g.fillStyle = grd;
        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
        g.clip();
        g.fillRect(0, 0, width, height);
        g.restore();
    }
    var animationTimer = setInterval(singleFrameAnimation, refreshRate);
    img.onload = draw;



    // Download Image
    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }


    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadCanvas(this, 'kaleidoscope', 'Kaleidoscope.png');
    }, false);



});

//test for image push

//Resize Kaleidoscope Canvas
function resize() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var kaleidoscopeCanvas = document.querySelector('canvas');

    kaleidoscopeCanvas.style.width = height * 1.3;
    kaleidoscopeCanvas.style.height = height * 0.9;
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);

//Change Soundcloud Playlist according to theme
function changePlaylist(theme) {
    var playlist = document.getElementById('soundcloud');
    playlist.src = theme;
}