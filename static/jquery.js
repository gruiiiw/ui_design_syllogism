$(document).ready(function () {
    console.log("Document ready");
    var quizId = $('#quizContainer').data('quiz-id');
    console.log("Quiz ID:", quizId); // Debug the quizId

    $('.item').on('dragstart', function (event) {
        console.log("Drag started for:", this.id);
        event.originalEvent.dataTransfer.setData('text', this.id);
    });

    $('.category').on('dragover', function (event) {
        console.log("Drag over category:", this.id);
        event.preventDefault();
        event.originalEvent.dataTransfer.dropEffect = 'move';
    }).on('drop', function (event) {
        console.log("Dropped on category:", this.id);
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData('text');
        var draggable = document.getElementById(data);
        console.log("Dropping item:", data, "into", this.id);
        if (!this.contains(draggable)) {
            this.appendChild(draggable);
            console.log("Appended", data, "to", this.id);
        } else {
            console.log(data, "already in", this.id);
        }

        // Debugging the state of drop zones after drop
        $('.drop-zone').each(function() {
            var zoneDetails = $(this).children().map(function() {
                return $(this).text().trim();
            }).get().join(' ');
            console.log("Drop Zone State:", zoneDetails);
        });

        if ($('.draggable-items .item').length === 0) {
            console.log("No more items to drag, checking correctness");
            if (quizId === 1) {
                checkCorrectness();
            } else if (quizId === 2) {
                checkBuildCorrect();
            }
        }
    });
});



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

    $('#result').text(resultText).show(); // Show the result text
}

function checkBuildCorrect() {
    const correctPropositions = ["Aristotle is a man", "The professor lectures", "I am hungry"];
    let propositions = $('.category').map(function () {
        return $(this).children().map(function () {
            return $(this).text().trim();
        }).get().join(' ');
    }).get();

    let correctCount = propositions.filter(prop => correctPropositions.includes(prop)).length;
    let resultText = (correctCount === correctPropositions.length) ? "CORRECT" : "Incorrect or incomplete propositions";
    $('#result').text(resultText).show();
}


