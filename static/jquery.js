$(document).ready(function () {
  console.log("Document ready");
  var quizId = $("#quizContainer").data("quiz-id");
  console.log("Quiz ID:", quizId); // Debug the quizId

  //$('.item').on('dragstart', function (event) {
  //    console.log("Drag started for:", this.id);
  //    event.originalEvent.dataTransfer.setData('text', this.id);
  //});

  //Startbutton event listener (enter = start button click)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.querySelector(".startBtn").click();
    }
  });

  function handleDragStart(event) {
    var isInDropZone = $(this).closest(".category").length > 0; // Check if the item is in a drop zone

    if (quizId == 6 && !isInDropZone) {
      var clone = this.cloneNode(true); // copy of node on which its called
      var newId = "clone_" + new Date().getTime();
      clone.id = newId;
      clone.setAttribute("draggable", "true");
      document.body.appendChild(clone); // Append clone to the body
      event.originalEvent.dataTransfer.setDragImage(clone, 0, 0); // Use the clone as the drag image
      event.originalEvent.dataTransfer.setData("text", newId);
      $(clone).data("dropped", false); // Mark the clone as not dropped

      var test = event.originalEvent.dataTransfer.getData("text");
      console.log(test);
    } else {
      event.originalEvent.dataTransfer.setData("text", this.id);
      var test = event.originalEvent.dataTransfer.getData("text");
      console.log(test);
    }
  }

  // Apply dragstart event to all .item elements and future .item elements
  $(document).on("dragstart", ".item", handleDragStart);

  $(".category").on("dragover", function (event) {
    event.preventDefault(); // Necessary to allow a drop
  });

  $(".category").on("drop", function (event) {
    // Drop event for category
    event.preventDefault();
    var data = event.originalEvent.dataTransfer.getData("text");
    console.log(data);
    var draggableElement = document.getElementById(data);
    if (draggableElement && !this.contains(draggableElement)) {
      this.appendChild(draggableElement);
      $(draggableElement).data("dropped", true); // Mark as successfully dropped
    }
  });

  // Remove clone if not successfully dropped into a category box
  $(document).on("dragend", ".item", function (event) {
    var cloneId = event.originalEvent.dataTransfer.getData("text");
    var cloneElement = document.getElementById(cloneId);
    console.log(cloneId); // nothing
    console.log(cloneElement); // null
    // Check if the clone was not dropped successfully and needs to be removed
    if (
      cloneElement &&
      !$(cloneElement).data("dropped") &&
      cloneId.startsWith("clone_")
    ) {
      cloneElement.parentNode.removeChild(cloneElement);
    }
  });

  $(".category")
    .on("dragover", function (event) {
      console.log("Drag over category:", this.id);
      event.preventDefault();
      event.originalEvent.dataTransfer.dropEffect = "move";
    })
    .on("drop", function (event) {
      console.log("Dropped on category:", this.id);
      event.preventDefault();
      var data = event.originalEvent.dataTransfer.getData("text");
      var draggable = document.getElementById(data);
      console.log("Dropping item:", data, "into", this.id);
      if (!this.contains(draggable)) {
        this.appendChild(draggable);
        console.log("Appended", data, "to", this.id);
      } else {
        console.log(data, "already in", this.id);
      }

      // Debugging the state of drop zones after drop
      $(".drop-zone").each(function () {
        var zoneDetails = $(this)
          .children()
          .map(function () {
            return $(this).text().trim();
          })
          .get()
          .join(" ");
        console.log("Drop Zone State:", zoneDetails);
      });

      if ($(".draggable-items .item").length === 0) {
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
          checkFinalQuiz();
          //   var cloneId = event.originalEvent.dataTransfer.getData("text");
          //   $("#" + cloneId).remove(); // Remove the clone after dropping
        }
      }
    });
});

function checkLogicalFallicies() {
  let mappingCorrect = true; // Assume mapping is correct initially
  let mappings = {
    b1: "box1",
    b2: "box2",
    b3: "box3",
  };

  $(".category").each(function () {
    let expectedItem = Object.keys(mappings).find(
      (key) => mappings[key] === this.id
    );
    let actualItem = $(this).children(".item").attr("id");
    if (actualItem !== expectedItem) {
      mappingCorrect = false;
    }
  });

  let resultText = mappingCorrect ? "CORRECT" : "INCORRECT";
  $("#result").text(resultText).show();
}
function checkSyllogismMapping() {
  let mappingCorrect = true; // Assume mapping is correct initially
  let mappings = {
    box1: "prompt1",
    box2: "prompt2",
    box3: "prompt3",
    box4: "prompt4",
    box5: "prompt5",
    box6: "prompt6",
    box7: "prompt7",
    box8: "prompt8",
    box9: "prompt9",
    box10: "prompt10",
    box11: "prompt11",
    box12: "prompt12",
    box13: "prompt13",
    box14: "prompt14",
    box15: "prompt15",
    box16: "prompt16",
    box17: "prompt17",
    box18: "prompt18",
  };

  $(".category").each(function () {
    let expectedItem = Object.keys(mappings).find(
      (key) => mappings[key] === this.id
    );
    let actualItem = $(this).children(".item").attr("id");
    if (actualItem !== expectedItem) {
      mappingCorrect = false;
    }
  });

  let resultText = mappingCorrect ? "CORRECT" : "INCORRECT";
  $("#result").text(resultText).show();
}

function checkFinalQuiz() {
  let mappingCorrect = true; // Assume mapping is correct initially
  let mappings = {
    box1: "prompt1",
    box2: "prompt2",
    box3: "prompt3",
    box4: "prompt4",
    box5: "prompt5",
    box6: "prompt6",
    box7: "prompt7",
    box8: "prompt8",
    box9: "prompt9",
    box10: "prompt10",
    box11: "prompt11",
    box12: "prompt12",
    box13: "prompt13",
    box14: "prompt14",
    box15: "prompt15",
    box16: "prompt16",
    box17: "prompt17",
    box18: "prompt18",
  };

  $(".category").each(function () {
    let expectedItem = Object.keys(mappings).find(
      (key) => mappings[key] === this.id
    );
    let actualItem = $(this).children(".item").attr("id");
    if (actualItem !== expectedItem) {
      mappingCorrect = false;
    }
  });

  let resultText = mappingCorrect ? "CORRECT" : "INCORRECT";
  $("#result").text(resultText).show();
}

function checkCorrectness() {
  var usStates = document.getElementById("us-states");
  var horses = document.getElementById("horses");
  var speakingThings = document.getElementById("speaking-things");

  var resultText = "Incorrect";
  if (
    usStates.querySelectorAll("#oregon, #rocky-mountain, #utah").length === 3 &&
    horses.querySelectorAll("#horse-over-there, #secretariat").length === 2 &&
    speakingThings.querySelectorAll("#speaks, #speak").length === 2
  ) {
    resultText = "Correct!";
  }

  $("#result").text(resultText).show(); // Show the result text
}

function checkBuildCorrect() {
  const correctPropositions = [
    "Aristotle is a man",
    "The professor lectures",
    "I am hungry",
  ];
  let propositions = $(".category")
    .map(function () {
      return $(this)
        .children()
        .map(function () {
          return $(this).text().trim();
        })
        .get()
        .join(" ");
    })
    .get();

  let correctCount = propositions.filter((prop) =>
    correctPropositions.includes(prop)
  ).length;
  let resultText =
    correctCount === correctPropositions.length
      ? "CORRECT"
      : "Incorrect or incomplete propositions";
  $("#result").text(resultText).show();
}
