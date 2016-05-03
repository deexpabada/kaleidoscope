/**
 * Created by deexpabada on 4/12/2016.
 */

/*Open Sidebar*/
$(document).ready(function(){
    $("#interactionBtn").click(function() {
        $("#InteractionBar").width("23%");
    }
    )}
)


/*Close Sidebar */
$(document).ready(function(){
    $(".closebtn").click(function() {
            $("#InteractionBar").width("0%");
        }
    )}
)

//Buttons Appear!
$(document).ready(function() {
    var buttonsAppeared;
    $(".switchArrayBtn, .downloadBtn, .autoplayKaleidoBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label").hide();
    buttonsAppeared = false;
    $(".kaleidoscope").click(function () {
        if (!buttonsAppeared) {
            $(".switchArrayBtn, .downloadBtn, .autoplayKaleidoBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label").show();
            buttonsAppeared = true;
        } else {
            $(".switchArrayBtn, .downloadBtn, .autoplayKaleidoBtn, .switchBtn, .ZoomInBtn, .ZoomOutBtn, .MultiUpload + label").hide();
            buttonsAppeared = false;
        }
    })
})


function titleScreen(navigation, opens) {
    var titleHeight;
    if (opens) {
        titleHeight = "100%";
    } else {
        titleHeight = "0%";
    }
    document.getElementById(navigation).style.height = titleHeight;
}

