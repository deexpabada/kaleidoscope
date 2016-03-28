$(function() {
    //initialize the canvas
    var canvas = $('#kaleidoscope');
    console.log(canvas);
    var g = canvas[0].getContext('2d');

    // button to switch picture
    $('.switchBtn').click(function () {
        console.log("clicked");
        newSrc = imageArray[Math.floor(Math.random() * imageArray.length)];
        if(newSrc === img.src){
            newSrc = imageArray[Math.floor(Math.random() * imageArray.length)];
        }
        zoomMultiplier = 1.0;
        img.src = newSrc;
        //todo: find a new way to create image array without having to manually load everything
        //todo: fix bug where sometimes the new source is the same as the previous source leading to no change
        //todo: fix a bug where occasionally animating after changing the image will break it all
    });

    //Zooming in and out effect
    var animate = function () {
        if(shift > shiftLimitMin && !toggle){
            shift--;
        }
        else if(shift == shiftLimitMin && toggle == false){
            toggle = !toggle;
            shift++;
        }
        else if(shift < shiftLimitMax && toggle){
            shift++;
        }
        else if(shift == shiftLimitMax && toggle){
            toggle=!toggle;
            shift--;
        }
        draw();
    };

    $('.ZoomInBtn').click(function(){
        zoomMultiplier += .1;
        draw();
    });

    $('.ZoomOutBtn').click(function(){
        zoomMultiplier -= .1;
        draw();
    });

    $('.shuffleBtn').click(function(){
        if(animationTimer == null) {
            animationTimer = setInterval(animate, 100);
        }
        else{
            clearInterval(animationTimer);
            animationTimer = null;
        }
    });

    /*
    * ShadingBtn allows for a translucent circle to go on top of the image, allowing the user to essentially shade their kaleidoscope to their wishes, kinda like a snapchat filter
    *
    * Bugs: When used with any of the animate or shuffle actions, the image will lose its nice gray scale attempt and instead be somewhat "cloudy" where the vibrance of the image is lost
    * Additionally it seems to cause images when changing to stack on top of each other so that Paul's head can be found over some fries during animation. The question is, is that a bug or a feature? xD
    *
    * */
    $('.ShadingBtn').click(function(){
        var canvas2=document.getElementById("kaleidoscope"); // grabs the canvas element
        var context=canvas2.getContext("2d"); // returns the 2d context object
        context.fillStyle= "#a3a3a3";
         // Half opacity

        shadingLensPresence = !shadingLensPresence;
        draw();
        if(shadingLensPresence){
            context.globalAlpha=.5;
            g.save();
            g.beginPath();
            g.arc(centerW, centerH, centerH - pixelBuffer, 0, 2 * Math.PI);
            g.clip();
            g.fillRect(0,0, 1000, 1000);
            g.restore();
            context.globalAlpha=1.0; //return to full opacity
            //todo change fill rect to use canvas dimensions, not a pair of arbitrary ones. Ayy lmao.

        }

    });

    var zoomMultiplier = 1.0;
    var shadingLensPresence = false;
    var imageArray = ["../images/squirrel.jpg", "../images/Fries.jpg", "../images/j.png", "../images/k.jpg", "../images/logo.png","../images/p.jpg", "../images/PaulAlt.jpg", "../images/SPACE.png"];
    var animationTimer = null;
    var imgSource = "../images/k.jpg";
    var shiftLimitMin = -40;
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

    var img = new Image();
    img.src = imgSource;
    changed = false;
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

    // Draw a single triangle
    function drawTriangle(shift) {
        g.save();
        g.beginPath();
        g.moveTo(TriLength, 0);
        g.lineTo(TriLength / 2, TriHeight);
        g.lineTo(0, 0);
        g.clip();
        g.drawImage(img, shift, shift, img.width * zoomMultiplier, img.height * zoomMultiplier);
        g.restore();
    }

    //Draw the huge Kalei on the center
    function draw() {
        drawCircle();

        //draw hexagons in circle
        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH - pixelBuffer, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();
    }

    function drawCircle(){
        var grd = g.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, "sandybrown");
        grd.addColorStop(1, "lightblue");
        g.fillStyle = grd;

        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
        g.clip();
        g.fillRect(0, 0, width, height);
        g.restore();
    }

    img.onload = draw;


    //Play and pause the song
    function aud_play_pause(songTitle) {
        var thisAudio = document.getElementById(songTitle);
        if (thisAudio.paused) {
            thisAudio.play();
        } else {
            thisAudio.pause();
        }
    }

    //todo: fix the download button
    // Download Image
    function download(){
        document.getElementById("downloader").download = "image.png";
        document.getElementById("downloader").href = document.getElementById("kaleidoscope").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
});