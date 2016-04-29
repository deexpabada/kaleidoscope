/**
 * Created by deexpabada on 4/12/2016.
 */

$(document).ready(function(){
    $("#interactionBtn").click(function() {
        $("#InteractionBar").width("23%");
    }
    )}
)


$(document).ready(function(){
    $(".closebtn").click(function() {
            $("#InteractionBar").width("0%");
        }
    )}
)

/* Close button in full screen*/
$(document).ready(function() {
    $(".closeFullscreen").hide();
    $(".fullBtn").click(function () {
            $(".closeFullscreen").show();
        }
    )
    $(".closeFullscreen").click(function () {
            fullscreen = false;
            resize();
            $(".closeFullscreen").hide();
        }
    )
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

