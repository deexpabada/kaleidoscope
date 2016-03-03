/**
 * Created by talhaahsan on 2/24/16.
 */
$(function() {
    var canvas = $('#kaleidoscope');
    console.log(canvas);
    var g = canvas[0].getContext('2d');

    //draw CIRCLE
    //g.beginPath();
    //g.arc(95, 50, 40, 0, 2 * Math.PI);
    //g.stroke();

    //show image and rotate the image
    var img = new Image();
    img.src = "../images/p.jpg";


    var pixelBuffer = 20;
    var width = 1000;
    var height = 650;
    var centerW = (width/2);
    var centerH = (height/2);
    var TriLength = 200;
    var TriHeight = Math.sqrt((TriLength*TriLength) - (TriLength*TriLength/4));

    function drawMultipleHexs(){
        g.translate(centerW, centerH);
        g.save();
        drawHex();
        g.restore();

        //above
        g.save();
        g.translate(0, -2*TriHeight);
        drawHex();
        g.restore();

        //lower right diagonal
        g.save();
        g.translate(1.5*TriLength, TriHeight);
        drawHex();
        g.restore();

        //directly below
        g.save();
        g.translate(0, 2*TriHeight);
        drawHex();
        g.restore();

        //upper left
        g.save();
        g.translate(-1.5*TriLength, -1*TriHeight);
        drawHex();
        g.restore();

        //lower left
        g.save();
        g.translate(-1.5*TriLength, TriHeight);
        drawHex();
        g.restore();

        //???
        g.save();
        g.translate(3*TriLength, 1/200*TriHeight); //1/200??
        drawHex();
        g.restore();

        g.save();
        g.translate(1.5*TriLength, 3*TriHeight);
        drawHex();
        g.restore();

        //upper right diagonal
        g.save();
        g.translate(1.5*TriLength, -1*TriHeight);
        drawHex();
        g.restore();
    }

    function drawHex(){
        for(i = 0; i< 6; i++) {
            if(i%2 == 0){
                drawTriangle();
            }
            if(i%2 == 1){
                g.save();
                g.scale(-1,1);
                drawTriangle();
                g.restore()
            }
            g.rotate(60 * Math.PI / 180);

        }
    }
    function drawTriangle() {
        //assuming image is 200x200, we want a triangle with a length of XYZ
        //g.drawImage(img, 0, 0, 200, 200);

        g.save();
        g.beginPath();
        g.moveTo(TriLength,0);
        g.lineTo(TriLength/2, TriHeight);
        g.lineTo(0, 0);
        g.clip();
        g.drawImage(img, 0, 0);
        g.restore();
    }

    /*function draw(){

        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();


    }*/

    function draw(){
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

        //draw hexagons in circle
        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH-pixelBuffer, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();
/*
        //draw CIRCLE button
        var grd2 = g.createLinearGradient(5, 5, 11, 0);
        grd2.addColorStop(0, "forestgreen");
        grd2.addColorStop(1, "gray");
        g.fillStyle = grd2;
        g.fillRect(880, 300, 20,20);*/
    }

    //showing img rotating at different angles on the screen
    img.onload = draw;

});