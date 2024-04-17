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
    var zone1 = document.getElementById('zone1');
    var zone2 = document.getElementById('zone2');
    var zone3 = document.getElementById('zone3');
    var resultText = "Incorrect";

    if (usStates.querySelectorAll("#oregon, #rocky-mountain, #utah").length === 3 &&
        horses.querySelectorAll("#horse-over-there, #secretariat").length === 2 &&
        speakingThings.querySelectorAll("#speaks, #speak").length === 2) {
        resultText = "Correct!";
    }
    if (zone1.querySelectorAll("#aristotle, #is, #a-man").length === 3 &&
        zone2.querySelectorAll("#the-professor, #lectures").length === 2 &&
        zone3.querySelectorAll("#i, #am, #hungry").length === 3) {
        resultText = "Correct!";
        }
    document.getElementById('result').innerHTML = resultText;
    document.getElementById('result').style.display = 'block'; // Show the result text

    
}

let draggables = document.querySelectorAll('.draggable');
    let dropZones = document.querySelectorAll('.drop-zone');

    // Adds event listeners to all draggable items
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.id); // Stores the id of the dragged element
        });
    });

    // Adds event listeners to all drop zones
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault(); // Necessary to allow the drop
            e.dataTransfer.dropEffect = 'move'; // Visual indicator of move operation
        });

        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            const id = e.dataTransfer.getData('text'); // Retrieves the id of the dragged element
            const draggable = document.getElementById(id);
            draggable.style.margin = '0'; // Reset margin to prevent layout shift
            if (!zone.contains(draggable)) { // Check to prevent appending the element more than once
                zone.appendChild(draggable); // Appends the dragged element to the drop zone
            }
            checkBuildCorrect(); // Calls function to check if the propositions are correct
        });
    });

    function checkBuildCorrect() {
        const correctPropositions = [
            "Aristotle is a man",
            "The professor lectures",
            "I am hungry"
        ];
        let propositions = Array.from(dropZones).map(zone =>
            Array.from(zone.children).map(child => child.textContent.trim()).join(' ')
        );
        let correctCount = propositions.filter(prop => correctPropositions.includes(prop)).length;

        console.log("Propositions checked:", propositions); // Outputs the current propositions to console
        console.log("Correct count:", correctCount); // Debugging the count of correct propositions

        const resultElement = document.getElementById('result');
        console.log("Result element:", resultElement); // Check if the element is found

        if (correctCount === 3) {
            resultElement.innerHTML = "CORRECT";
            resultElement.style.display = 'block';
        } else {
            resultElement.innerHTML = "Incorrect or incomplete propositions";
            resultElement.style.display = 'block';

        }
    }


$(document).ready(function(){
    

})