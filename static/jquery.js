function x(x){
    //setup

}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, target) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var element = document.getElementById(data);
    if (target.classList.contains('category')) { // Ensure we're dropping on a category only
        target.appendChild(element);
        if (document.querySelectorAll('.draggable-items .item').length === 0) {
            checkCorrectness();
        }
    }
}

function checkCorrectness() {
    var usStates = document.getElementById('us-states');
    var horses = document.getElementById('horses');
    var speakingThings = document.getElementById('speaking-things');
    var resultText = "Incorrect";

    if (usStates.querySelectorAll("#oregon, #rocky-mountain, #utah").length === 3 &&
        horses.querySelectorAll("#horse-over-there, #secretariat").length === 2 &&
        speakingThings.querySelectorAll("#speaks, #speak").length === 2) {
        resultText = "Correct!";
    }

    document.getElementById('result').innerHTML = resultText;
    document.getElementById('result').style.display = 'block'; // Show the result text
}



$(document).ready(function(){
    

})