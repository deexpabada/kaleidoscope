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


function titleScreen(navigation, opens) {
    var titleHeight;
    if (opens) {
        titleHeight = "100%";
    } else {
        titleHeight = "0%";
    }
    document.getElementById(navigation).style.height = titleHeight;
}

