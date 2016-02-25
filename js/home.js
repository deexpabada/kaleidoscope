$(function() {
    var canvas = $('#kaleidoscope')
    console.log(canvas)
    var g = canvas[0].getContext('2d')

    //drawing lines
    g.moveTo(10, 10)
    g.lineTo(12, 40)
    g.lineTo(21, 53)
    g.stroke()

    //draw mirroed line
    g.translate(0, 100);
    g.scale(1, -1);
    g.moveTo(10, 10)
    g.lineTo(12, 40)
    g.lineTo(21, 53)
    g.stroke()

    //draw CIRCLE
    //g.beginPath();
    //g.arc(95, 50, 40, 0, 2 * Math.PI);
    //g.stroke();

    // set gradient value
    var grd = g.createLinearGradient(100, 0, 200, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(1, "blue");

    //draw gradient rectangle
    g.fillStyle = grd;
    //g.fillRect(80, 60, 75, 50);

    //show image and rotate the image
    var img = new Image();
    img.src = "../images/k.jpg"

    var img_x1 = img.height;
    var img_x2 = img.width;
    var img_x3 = canvas.centerline;
    console.log(img_x1);
    console.log(img_x2);
    console.log(img_x3);

    function drawTriangle(){

    }

    function findCordinate(){

    }


    function draw() {
        g.translate(0, 100);
        g.scale(1, -1);

        g.save();
        g.beginPath();
        g.rotate(0.3);
        g.moveTo(50+231/2,50)
        g.lineTo(50+215,50+235)
        g.lineTo(50,50+231)
        //g.translate(20,20);
        g.clip();
        //g.translate(30,0)
        //g.fillStyle = "magenta";
        //g.fillRect(-1000,-1000,2000,2000);
        g.drawImage(img, 55, 50, 200, 200);
        g.restore();


        //g.rotate(0.1)
        //g.drawImage(img, 56, 50, 100, 150);
        //g.rotate(0.2)
        //g.drawImage(img, 150, 70, 40, 40);
    }

        //showing img rotating at different angles on the screen
    img.onload = draw

});

