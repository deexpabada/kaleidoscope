$(function() {
    //initialize the canvas
    var canvas2 = $('#imagewall');
    var g = canvas2[0].getContext('2d');


    var ImgageNum = 4;
    var UserImageArray = [];
    var img = new Image();



    function drawImages(UserImageArray){
        totalX = 0;
        for (image in UserImageArray) {
            img.src = image;
            g.drawImage(img,totalX, 0);
            totalX += image.naturalWidth;
        }
    }

    $('#ImageUpload').change(function(){
        var file = document.getElementById("ImageUpload").files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            reader.onload = function(){
                img.src = reader.result;
            //    draw();
            //    zoomMultiplier = 1.0;
            };
            reader.readAsDataURL(file);
            UserImageArray.push(file);
            console.log(UserImageArray);
        } else {
            fileDisplayArea.innerHTML = "File not supported!"
        }
    });

    function draw(){
        drawImages(UserImageArray);
    }


    img.onload = draw;});


