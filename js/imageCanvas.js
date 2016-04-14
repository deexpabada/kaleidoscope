$(function() {
    //initialize the canvas
    var canvas2 = $('#imagewall');
    var g = canvas2[0].getContext('2d');
    //canvas2.style.display="none";

    var ImgageNum = 4;
    var UserImageArray = [];
    var img = new Image();

    function resizeImg(img, height, width) {
        img.height = height;
        img.width = width;
    }

    function drawImages(UserImageArray){
        totalX = 0;
        for (image in UserImageArray) {
            img.src = image;
            resizeImg(img, 100,100);
            //clipping fill
            g.save();
            g.beginPath();
            g.moveTo(100, 100);
            g.lineTo(150, 150);
            g.lineTo(300, 100);
            g.clip();
            g.drawImage(img,totalX, 0);
            totalX += img.width;
            g.restore();
            console.log(img.width);
            console.log(totalX);
        }


    }

    $('#ImageUpload').change(function(){
        var file = document.getElementById("ImageUpload").files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            reader.onload = function(){
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            UserImageArray.push(file);
        } else {
            fileDisplayArea.innerHTML = "File not supported!"
        }
    });

    function draw(){
        drawImages(UserImageArray);
    }


    img.onload = draw;

});


