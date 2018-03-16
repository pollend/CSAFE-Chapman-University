<!--What happens when menu icon is pressed-->
function respondToMenuPress() {
    console.log("pressed top menu")
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}