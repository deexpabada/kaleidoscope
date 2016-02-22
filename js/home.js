//$(function() {
//    var canvas = $('#kaleidoscope')
//    console.log(canvas)
//    var g = canvas[0].getContext('2d')
//
//    //drawing lines
//    g.moveTo(10, 10)
//    g.lineTo(12, 40)
//    g.lineTo(21, 53)
//    g.stroke()
//
//    g.beginPath();
//    g.arc(95, 50, 40, 0, 2 * Math.PI);
//    g.stroke();
//
//    var grd = g.createLinearGradient(100, 0, 200, 0);
//    grd.addColorStop(0, "red");
//    grd.addColorStop(1, "blue");
//
//    g.fillStyle = grd;
//    g.fillRect(80, 60, 75, 50);
//
//    g.translate(0, 100);
//    g.scale(1, -1);
//
//    //draw gradient rectangle
//    //g.fillStyle = grd;
//    //g.fillRect(80, 45, 75, 50);
//
//
//    g.moveTo(10, 10)
//    g.lineTo(12, 40)
//    g.lineTo(21, 53)
//    g.stroke()
//
//
//    //show image and rotate the image
//    var img = new Image();
//    img.src = "k.jpg"
//    img.onload = function() {
//        //clipImage(img,0,2,12,11);
//        g.translate(0, 100);
//        g.scale(1, -1);
//
//        g.rotate(0.5)
//
//
//        g.drawImage(img, 10, -10, 10, 10);
//        g.rotate(0.1)
//        g.drawImage(img, 10, 10, 10, 10);
//
//        g.rotate(0.2)
//        g.drawImage(img, 10, -20, 10, 10);
//    }
//
//});
//
