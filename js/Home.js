$(function() {
    //initialize the canvas
    var canvas = $('#kaleidoscope');
    var g = canvas[0].getContext('2d');

    //var ImgTransition = function(){
    //    var i = 0;
    //    while (true){
    //        var timepassed = 0;
    //        animationTimer = setInterval(animatefor7sec(), 100);
    //        if(timepassed >= 7000) {
    //            clearInterval(animationTimer);
    //        }
    //
    //        //changes opacity of images and draws to canvas
    //        var fade = setInterval(fading(imageArray[i], imageArray[i+1]), 100);
    //        if(timepassed >=8000){
    //            clearInterval(fade);
    //        }
    //
    //        //code below loops i to the start
    //        i++;
    //        if(i == imageArray.length){
    //            i = 0;
    //        }
    //    }
    //};
    //
    //function animatefor7sec(){
    //    SingleFrameAnimation();
    //    timepassed += 100;
    //}
    //
    //function fading(img1, img2){
    //    g.globalAlpha = 1.0 - (timepassed - 7000)/10;
    //    console.log(g.globalAlpha);
    //    img.src = img1;
    //    draw();
    //    g.globalAlpha = (timepassed - 7000)/10;
    //    img.src = img2;
    //    draw();
    //    timepassed +=100;
    //};


    var UserImageArray = [];
    $('#MultiUpload').change(function(){
        var imageType = /image.*/;
        var files = document.getElementById("MultiUpload");
        for (i = 0; i < files.length; i++) {
            var file = document.getElementById("MultiUpload").files[i];
            if (file.type.match(imageType)) {
                var reader = new FileReader();
                //reader.onload = function(){
                //    img.src = reader.result;
                //};
                reader.readAsDataURL(file);
                UserImageArray.push(file);
            } else {
                fileDisplayArea.innerHTML = "File not supported!"
            }
        }
        console.log(UserImageArray);
    });



    // button to switch picture
    $('.switchBtn').click(function () {
        console.log("clicked");
        newSrc = imageArray[Math.floor(Math.random() * imageArray.length)];
        if(newSrc === img.src){
            newSrc = imageArray[Math.floor(Math.random() * imageArray.length)];
        }
        zoomMultiplier = 1.0;
        img.src = newSrc;
    });

    //animation effect
    //var SingleFrameAnimation = function () {
    //    if(shift > shiftLimitMin && !toggle){
    //        shift--;
    //    }
    //    else if(shift == shiftLimitMin && toggle == false){
    //        toggle = !toggle;
    //        shift++;
    //    }
    //    else if(shift < shiftLimitMax && toggle){
    //        shift++;
    //    }
    //    else if(shift == shiftLimitMax && toggle){
    //        toggle=!toggle;
    //        shift--;
    //    }
    //    draw();
    //};

    function SingleFrameAnimation(){
        shift--;
        draw();
    }


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
        if(animationTimer == null) {
            animationTimer = setInterval(SingleFrameAnimation, refreshRate);
        }
        else{
            clearInterval(animationTimer);
            animationTimer = null;
        }
    });

    //Quick Button Implementation

    $('.autoplayKaleidoBtn').click(function(){
        if(animationTimer == null) {
            animationTimer = setInterval(SingleFrameAnimation, refreshRate);
        }
        else{
            clearInterval(animationTimer);
            animationTimer = null;
        }
    });

    //test for transition
    //$('.autoplayKaleidoBtn').click(ImgTransition);

    $('.quickZoomInBtn').click(function(){
        zoomMultiplier += .1;
        if(zoomMultiplier > 4.0){
            zoomMultiplier = 4.0;
        }
        draw();
    });

    $('.quickZoomOutBtn').click(function(){
        zoomMultiplier -= .1;
        if(zoomMultiplier < 0.1){
            zoomMultiplier = .01;
        }
        draw();
    });

    $('.fullBtn').click(function(){
        fullscreen = !fullscreen;
        if(fullscreen){
            document.getElementById("kaleidoscope").style.left = 0;
        }
        else{
            document.getElementById("kaleidoscope").style.left = "18%";
        }
        resize();
        g.clearRect(0,0, width, height);
        draw();
    });

    $('.nameBtn').click(function(){
        var name = document.getElementById("NameBox").value;
        var element = document.getElementById("header");
        element.innerHTML = name;
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

    var timepassed = 0;
    var zoomMultiplier = 1.0;
    var shadingLensPresence = false;
    var imageArray = ["../images/squirrel.jpg", "../images/Fries.jpg", "../images/j.png", "../images/k.jpg", "../images/logo.png","../images/p.jpg", "../images/PaulAlt.jpg", "../images/SPACE.png", "../images/after.png", "../images/before.png"];
    var animationTimer = null;
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
        g.restore();
    }

    //Draw the huge Kalei on the center
    function drawWithCircle() {
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

    function drawFull(){
        g.save();
        g.fillStyle = "black";
        g.fillRect(0,0,width, height);
        g.restore();
        g.fillStyle = g.createPattern(img, "repeat");
        g.save();
        drawMultipleHexs();
        g.restore();
    }

    function draw(){
        if(fullscreen){
            drawFull();
        }
        else{
            drawWithCircle();
        }
    }

    //the background/border of Kalei
    function drawCircle(){
        var grd = g.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, "Gray");
        grd.addColorStop(1, "Black");
        g.fillStyle = grd;

        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
        g.clip();
        g.fillRect(0, 0, width, height);
        g.restore();
    }

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

var fullscreen = false;

//Resize Kaleidoscope Canvas
function resize() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var kaleidoscopeCanvas = document.querySelector('canvas');
    if(fullscreen){
        kaleidoscopeCanvas.style.height = height * 0.91;
        kaleidoscopeCanvas.style.width = width;
    }
    else {
        kaleidoscopeCanvas.style.width = height * 1.3;
        kaleidoscopeCanvas.style.height = height * 0.9;
    }

}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);

//Change Spotify Playlist according to theme
function changePlaylist(theme) {
    var playlist = document.getElementById('spotify');
    playlist.src = theme;
}