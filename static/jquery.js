$(document).ready(function () {
    let cloneCounter = 0;
    let done1 = false;
    let done2 = false;
    let done3 = false;
    let done4 = false;
    let done5 = false;
    console.log("Document ready");
    var quizId = $('#quizContainer').data('quiz-id');
    console.log("Quiz ID:", quizId); // Debug the quizId

    //$('.item').on('dragstart', function (event) {
    //    console.log("Drag started for:", this.id);
    //    event.originalEvent.dataTransfer.setData('text', this.id);
    //});

    //Startbutton event listener (enter = start button click)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.querySelector('.startBtn').click();
        }
    });

    
    //Restart event listener (enter = start button click)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.querySelector('.restart-btn').click();
        }
    });

    function handleDragStart(event) {
        var isInDropZone = $(this).closest('.category').length > 0; // Check if the item is in a drop zone
        
        if (quizId == 5 && !isInDropZone) {
            
            var clone = this.cloneNode(true); // copy of node on which its called 
            var newId = 'clone_' + new Date().getTime();
            clone.id = newId;
            clone.setAttribute('draggable', 'true');
            document.body.appendChild(clone); // Append clone to the body
            cloneCounter++;
            console.log("Clone counter: ", cloneCounter);  // Optional: for debugging
            event.originalEvent.dataTransfer.setDragImage(clone, 0, 0); // Use the clone as the drag image
            event.originalEvent.dataTransfer.setData('text', newId);
            $(clone).data('dropped', false); // Mark the clone as not dropped
            
            var test = event.originalEvent.dataTransfer.getData('text');
            
            console.log("Clone counter: ", cloneCounter);  // Optional: for debugging
            console.log(test);
        } 
       
        else {
            event.originalEvent.dataTransfer.setData('text', this.id);
            var test = event.originalEvent.dataTransfer.getData('text');
            console.log(test);
        }

    }
    
    // Apply dragstart event to all .item elements and future .item elements
    $(document).on('dragstart', '.item', handleDragStart);


    $('.category').on('dragover', function (event) {
        event.preventDefault(); // Necessary to allow a drop
    });
    
    $('.category').on('drop', function (event) { // Drop event for category
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData('text');
        console.log(data);
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
        console.log(cloneId); // nothing
        console.log(cloneElement); // null
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
                checkQuiz5Correct();
            }
        } else {
            if (quizId == 5) {
                checkQuiz5Correct();
            }
        }
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

    let resultText = mappingCorrect ? "Correct! <img src='https://cdn-icons-png.flaticon.com/512/5289/5289675.png' alt='Checkmark' style='vertical-align: middle; width: 8%; height: auto;'/>" : "Incorrect! <img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png' alt='Incorrect' style='vertical-align: middle; width: 6%; height: auto;'/>";
    if(done4 === false){
        done4 = true;
        if(mappingCorrect) {
            updateScore(1);
        }
    
    }
    $('#result').html(resultText).show();
}

function updateScore(increment) {
    $.ajax({
        url: '/update-score',
        method: 'POST',
        data: {increment: increment},
        success: function(response) {
            console.log("Score updated: ", response.score);
        }
    });
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

    let resultText = mappingCorrect ? "Correct! <img src='https://cdn-icons-png.flaticon.com/512/5289/5289675.png' alt='Checkmark' style='vertical-align: middle; width: 8%; height: auto;'/>" : "Incorrect! <img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png' alt='Incorrect' style='vertical-align: middle; width: 6%; height: auto;'/>";
    if(done3 === false){
        done3 = true;
        if(mappingCorrect) {
            updateScore(1);
        }
    
    }
    $('#result').html(resultText).show();
}

function checkCorrectness() {
    var usStates = document.getElementById('us-states');
    var horses = document.getElementById('horses');
    var speakingThings = document.getElementById('speaking-things');
    
    var resultText = "Incorrect! <img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png' alt='Incorrect' style='vertical-align: middle; width: 6%; height: auto;'/>";
    if (usStates.querySelectorAll("#oregon, #rocky-mountain, #utah").length === 3 &&
        horses.querySelectorAll("#horse-over-there, #secretariat").length === 2 &&
        speakingThings.querySelectorAll("#speaks, #speak").length === 2) {
        resultText = "Correct! <img src='https://cdn-icons-png.flaticon.com/512/5289/5289675.png' alt='Checkmark' style='vertical-align: middle; width: 8%; height: auto;'/>";
    }
    if(done1 === false){
        done1 = true;
        if (usStates.querySelectorAll("#oregon, #rocky-mountain, #utah").length === 3 &&
            horses.querySelectorAll("#horse-over-there, #secretariat").length === 2 &&
            speakingThings.querySelectorAll("#speaks, #speak").length === 2) {
                updateScore(1);
        }
    }

    $('#result').html(resultText).show(); // Show the result text
}

function checkBuildCorrect() {
    const correctPropositions = ["Aristotle is a man", "The professor lectures", "I am hungry"];
    let propositions = $('.category').map(function () {
        return $(this).children().map(function () {
            return $(this).text().trim();
        }).get().join(' ');
    }).get();

    let correctCount = propositions.filter(prop => correctPropositions.includes(prop)).length;
    // Use .html() instead of .text() to insert the image tag along with the text
    
    let resultText = (correctCount === correctPropositions.length)
        ? "Correct! <img src='https://cdn-icons-png.flaticon.com/512/5289/5289675.png' alt='Checkmark' style='vertical-align: middle; width: 8%; height: auto;'/>"
        : "Incorrect! <img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png' alt='Incorrect' style='vertical-align: middle; width: 6%; height: auto;'/>";
    $('#result').html(resultText).show(); // Use html() to parse the image tag correctly
    if(done2 === false){
        done2 = true;
        if (correctCount === correctPropositions.length) {
            updateScore(1);
    }
    
    }
}


function checkQuiz5Correct() {
    const correctPropositions = {
        v1: "Mikey is a snake",
        v2: "All snakes are reptiles",
        v3: "Mikey is a reptile",
        f1: "Mikey is a reptile",
        f2: "All snakes are reptiles",
        f3: "Mikey is a snake",
    };

    console.log("Checking correctness for Quiz 5");

    let correctCount = 0;

    $('.category').each(function () {
        const categoryId = this.id;
        console.log(`Checking category ID: ${categoryId}`);

        let proposition = $(this).children().map(function () {
            return $(this).text().trim();
        }).get().join(' ');

        console.log(`Proposition found: ${proposition}`);
        console.log(`Expected proposition: ${correctPropositions[categoryId]}`);

        if (proposition === correctPropositions[categoryId]) {
            console.log(`Proposition for ${categoryId} is correct`);
            correctCount++;
        } else {
            console.log(`Proposition for ${categoryId} is incorrect`);
        }
    });

    console.log(`Total correct propositions: ${correctCount}`);
    if(cloneCounter >= 18){
    let resultText = (correctCount === Object.keys(correctPropositions).length) ? "Correct! <img src='https://cdn-icons-png.flaticon.com/512/5289/5289675.png' alt='Checkmark' style='vertical-align: middle; width: 8%; height: auto;'/>" : "Incorrect! <img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png' alt='Incorrect' style='vertical-align: middle; width: 6%; height: auto;'/>";
    if(done5 === false){
        done5 = true;
        if (correctCount === Object.keys(correctPropositions).length) {
            updateScore(1);
        }
    }
    console.log(`Result: ${resultText}`);
    $('#result').html(resultText).show();
    }
}
});
