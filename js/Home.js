$(function() {
    //initialize the canvas
    var canvas = $('#kaleidoscope');
    var g = canvas[0].getContext('2d');

    var timepassed = 0;
    var imgIndex = 0;
    var imgTransition = function(){
        function switchPic(){
            if(timepassed <= 2000){
                singleFrameAnimation();
                timepassed += 100;
                setTimeout(switchPic,100);
                console.log(timepassed);
            }
            else{
                setTimeout(function(){fading(imageArray[imgIndex], imageArray[imgIndex+1])}, 300);
                g.globalAlpha = 1;
                timepassed = 0;
                imgIndex++;
                if(imgIndex == imageArray.length-1){
                    imgIndex = 0;
                }
                switchPic();
            }
        }
        switchPic();
    };

    function fading(img1, img2){
        g.globalAlpha -= (timepassed /3000);
        img.src = img1;
        draw();
        g.globalAlpha = (timepassed /3000);
        img.src = img2;
        draw();
        timepassed +=100;
        g.globalAlpha = 1.0;
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
        shift = 0;
        img.src = newSrc;
        draw();
    });


    function singleFrameAnimation(){
        shift--;  //another variable keeps track of the transition amount
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


    //Button Implementation
    $('.autoplayKaleidoBtn').click(function(){
        if(animationTimer != null) {
            clearInterval(animationTimer);
            animationTimer = null;
        }
        else{
            animationTimer = setInterval(singleFrameAnimation, refreshRate);
        }
    });

    //test for transition
    $('.transitionTest').click(imgTransition);
    ////


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
                    shift = 0;
                };
                reader.readAsDataURL(file);
            } else {
                fileDisplayArea.innerHTML = "File not supported!"
            }
    });

    var zoomMultiplier = 1.0;
    var imageArray = ["../images/SPACE.png","../images/squirrel.jpg", "../images/Fries.jpg", "../images/j.png", "../images/k.jpg", "../images/logo.png","../images/p.jpg", "../images/PaulAlt.jpg", "../images/after.png", "../images/a.jpg"];
    var imgSource = "../images/SPACE.png";
    var shift = 0;
    var pixelBuffer = 20;
    var width = 1000;
    var height = 650;
    var centerW = (width / 2);
    var centerH = (height / 2);
    var TriLength = 150;
    var TriHeight = Math.sqrt((TriLength * TriLength) - (TriLength * TriLength / 4));
    var refreshRate = 1000 / 60;

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

    //the background/border
    function drawCircle(){
        var grd = g.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, "lightgreen");
        grd.addColorStop(0.25,"navy");
        grd.addColorStop(0.5,"yellow");
        grd.addColorStop(0.75,"orange");
        grd.addColorStop(1, "red");
        g.fillStyle = grd;
        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
        g.clip();
        g.fillRect(0, 0, width, height);
        g.restore();
    }

    img.onload = draw;
    var animationTimer = setInterval(singleFrameAnimation, refreshRate);


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
    var origHeight = 650;
    var orgWidth = 1000;
    if(fullscreen){
        kaleidoscopeCanvas.style.height = height;
        kaleidoscopeCanvas.style.width = width;
        kaleidoscopeCanvas.height = height;
        kaleidoscopeCanvas.width = width;
        kaleidoscopeCanvas.style.top = '7.5%';
    }
    else {
        kaleidoscopeCanvas.style.width = height * 1.3;
        kaleidoscopeCanvas.style.height = height * 0.9;
        kaleidoscopeCanvas.width = orgWidth;
        kaleidoscopeCanvas.height =origHeight;
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