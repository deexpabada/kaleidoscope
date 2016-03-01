$(function() {
    var canvas = $('#kaleidoscope');
    console.log(canvas);
    var g = canvas[0].getContext('2d');


    //show image and rotate the image
    var img = new Image();
    img.src = "../images/k.jpg";

    function drawMultipleHexs(){
        g.translate(300, 300);
        g.save();
        drawHex();
        g.restore();

        g.save();
        g.translate(300, Math.sqrt(40000-10000));
        drawHex();
        g.restore();

        g.save();
        g.translate(0, 2*Math.sqrt(40000-10000));
        drawHex();
        g.restore();

        g.save();
        g.translate(600, 2*Math.sqrt(40000-10000));
        drawHex();
        g.restore();

        g.save();
        g.translate(600, 1/200*Math.sqrt(40000-10000));
        drawHex();
        g.restore();

        g.save();
        g.translate(300, 3*Math.sqrt(40000-10000));
        drawHex();
        g.restore();

        g.save();
        g.translate(300, -1*Math.sqrt(40000-10000));
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
        //draw a single triangle
        //assuming image is 200x200, we want a triangle with a length of XYZ
        //g.drawImage(img, 0, 0, 200, 200);

        g.save();
        g.beginPath();
        g.moveTo(200,0);
        g.lineTo(100, Math.sqrt(40000-10000));
        g.lineTo(0, 0);
        g.clip();
        g.drawImage(img, 0, 0);
        g.restore();
    }

    function draw(){
        var grd = g.createLinearGradient(150, 250, 200, 0);
        grd.addColorStop(0, "sandybrown");
        grd.addColorStop(1, "lightblue");
        g.fillStyle = grd;

        g.save();
        g.beginPath();
        g.arc(600, 300, 300, 0, 2 * Math.PI);
        g.clip();
        g.fillRect(300,0,600,600);
        g.restore();

        g.save();
        g.beginPath();
        g.arc(600, 300, 280, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();

        //draw CIRCLE button
        var grd2 = g.createLinearGradient(5, 5, 11, 0);
        grd2.addColorStop(0, "forestgreen");
        grd2.addColorStop(1, "gray");
        g.fillStyle = grd2;
        g.fillRect(880, 300, 20,20);
    }

        //showing img rotating at different angles on the screen
    img.onload = draw;

});

