$(document).ready(function () {
    console.log("Document ready");
    var quizId = $('#quizContainer').data('quiz-id');
    console.log("Quiz ID:", quizId); // Debug the quizId

    //$('.item').on('dragstart', function (event) {
    //    console.log("Drag started for:", this.id);
    //    event.originalEvent.dataTransfer.setData('text', this.id);
    //});

    function handleDragStart(event) {
        var isInDropZone = $(this).closest('.category').length > 0; // Check if the item is in a drop zone
        if (quizId == 5 && !isInDropZone) {
            var clone = this.cloneNode(true);
            var newId = 'clone_' + new Date().getTime();
            clone.id = newId;
            clone.setAttribute('draggable', 'true');
            document.body.appendChild(clone); // Append clone to the body
            event.originalEvent.dataTransfer.setDragImage(clone, 0, 0); // Use the clone as the drag image
            event.originalEvent.dataTransfer.setData('text', newId);
            $(clone).data('dropped', false); // Mark the clone as not dropped
        } else {
            event.originalEvent.dataTransfer.setData('text', this.id);
        }
    }
    
    // Apply dragstart event to all .item elements and future .item elements
    $(document).on('dragstart', '.item', handleDragStart);
    
    $('.category').on('dragover', function (event) {
        event.preventDefault(); // Necessary to allow a drop
    });
    
    $('.category').on('drop', function (event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData('text');
        var draggableElement = document.getElementById(data);
        if (draggableElement && !this.contains(draggableElement)) {
            this.appendChild(draggableElement);
            $(draggableElement).data('dropped', true); // Mark as successfully dropped
        }
    });
    
    // Remove clone if not successfully dropped into a category box
    $(document).on('dragend', '.item', function (event) {
        var cloneId = event.originalEvent.dataTransfer.getData('text');
        var cloneElement = document.getElementById(cloneId);
        // Check if the clone was not dropped successfully and needs to be removed
        if (cloneElement && !$(cloneElement).data('dropped') && cloneId.startsWith('clone_')) {
            cloneElement.parentNode.removeChild(cloneElement);
        }
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
            } else if (quizId === 3) {
                checkSyllogismMapping();
            } else if (quizId == 4) {
                checkLogicalFallicies();
            } else if (quizId == 5) {
                var cloneId = event.originalEvent.dataTransfer.getData('text');
                $('#' + cloneId).remove(); // Remove the clone after dropping
            }
        }
    });
});

function checkLogicalFallicies(){
    let mappingCorrect = true; // Assume mapping is correct initially
    let mappings = {
        'b1': 'box1',
        'b2': 'box2',
        'b3': 'box3'
    };

    $('.category').each(function() {
        let expectedItem = Object.keys(mappings).find(key => mappings[key] === this.id);
        let actualItem = $(this).children('.item').attr('id');
        if (actualItem !== expectedItem) {
            mappingCorrect = false;
        }
    });

    let resultText = mappingCorrect ? "CORRECT" : "INCORRECT";
    $('#result').text(resultText).show();
}
function checkSyllogismMapping() {
    let mappingCorrect = true; // Assume mapping is correct initially
    let mappings = {
        'p1_1': 'z11',
        'p1_2': 'z12',
        'p2_1': 'z21',
        'p2_2': 'z22',
        'c_1': 'z31',
        'c_2': 'z32'
    };

    $('.category').each(function() {
        let expectedItem = Object.keys(mappings).find(key => mappings[key] === this.id);
        let actualItem = $(this).children('.item').attr('id');
        if (actualItem !== expectedItem) {
            mappingCorrect = false;
        }
    });

    let resultText = mappingCorrect ? "CORRECT" : "INCORRECT";
    $('#result').text(resultText).show();
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


