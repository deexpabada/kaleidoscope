$(function() {
    var canvas = $('#kaleidoscope')
    console.log(canvas)
    var g = canvas[0].getContext('2d')

    //drawing lines
    g.moveTo(10, 10)
    g.lineTo(12, 40)
    g.lineTo(21, 53)
    g.stroke()

    //draw circle
    g.beginPath();
    g.arc(95, 50, 40, 0, 2 * Math.PI);
    g.stroke();

    // set gradient value
    var grd = g.createLinearGradient(100, 0, 200, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(1, "blue");

    //draw gradient rectangle
    g.fillStyle = grd;
    g.fillRect(80, 60, 75, 50);

    //draw mirroed line
    g.translate(0, 100);
    g.scale(1, -1);
    g.moveTo(10, 10)
    g.lineTo(12, 40)
    g.lineTo(21, 53)
    g.stroke()


    //show image and rotate the image
    var img = new Image();
    img.src = "../images/k.jpg"
    img.onload = function() {
        //console.log(img.src)
        g.translate(0, 100);
        g.scale(1, -1);

        g.rotate(0.5)
        g.drawImage(img, 120, 50, 50, 50);
        g.rotate(0.1)
        g.drawImage(img, 260, 10, 50, 50);
        g.rotate(0.2)
        g.drawImage(img, 150, 70, 40, 40);
    }

});

