/**
 * Created by deexpabada on 4/12/2016.
 */


function toggleNav(navBar, open) {
    var width;
    if (open) {
        width = "20%";
    } else {
        width = "0%"
    }
    document.getElementById(navBar).style.width = width;
    document.getElementById("main").style.marginLeft = width;
}

