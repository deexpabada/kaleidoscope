$(function() {
    var canvas = $('#kaleidoscope')
    console.log(canvas)
    var g = canvas[0].getContext('2d')


    //draw CIRCLE
    //g.beginPath();
    //g.arc(95, 50, 40, 0, 2 * Math.PI);
    //g.stroke();

    //show image and rotate the image
    var img = new Image();
    img.src = "../images/p.jpg"

    var img_x1 = img.height;
    var img_x2 = img.width;
    var img_x3 = canvas.centerline;
    console.log(img_x1);
    console.log(img_x2);
    console.log(img_x3);


    function findCordinate(){

    }

    function draw(){
        g.translate(300, 300);
        g.save();
        drawHex();
        g.restore();

        g.save()
        g.translate(300, Math.sqrt(40000-10000));
        drawHex();
        g.restore();

        g.translate(0, 2*Math.sqrt(40000-10000));
        drawHex();
        //g.rotate(45*Math.PI/180);

    }

    function drawHex(){
        var symettry = 6;
        for(i = 0; i< symettry; i++) {
            if(i%2 == 0){
                drawTriangle();
            }
            if(i%2 == 1){
                g.save();
                g.scale(-1,1);
                drawTriangle();
                g.restore()
            }
            g.rotate((60) * Math.PI / 180);

        }
    }
    function drawTriangle() {

        //g.translate(300,300);
        //g.rotate((45*Math.PI/180));
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

        //showing img rotating at different angles on the screen
    img.onload = draw;

});

