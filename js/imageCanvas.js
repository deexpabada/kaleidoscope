$(function() {
    //initialize the canvas
    var canvas2 = $('#imagewall');
    var g = canvas2[0].getContext('2d');


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
            g.drawImage(img,totalX, 0);
            totalX += img.width;
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


