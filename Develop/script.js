// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  function updateCurrentDate() {
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $("#currentDay").text(currentDate);
  }

  $("#clearLocalStorage").on("click", function () {
    if (confirm("Are you sure you want to clear your schedule?")) {
      localStorage.clear();
      retrieveAndSetUserInput();
      $("#saveMessage").text("Local storage cleared, refresh the page").removeClass("d-none");

      setTimeout(function () {
        $("#saveMessage").addClass("d-none");
      }, 3000);
    }
  });

  function colorCodeTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  $(".container-fluid").on("click", ".saveBtn", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var savedEventText = $(this).siblings(".description").val();
    localStorage.setItem(blockId, savedEventText);

    $("#saveMessage").removeClass("d-none");

    setTimeout(function () {  
      $("#saveMessage").addClass("d-none");
  }, 3000);
});
  
  function retrieveAndSetUserInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedEventText = localStorage.getItem(blockId);

      if (savedEventText) {
        $(this).find(".description").val(savedEventText);
      }
    });
  }

  function generateTimeBlocks() {
    var container = $(".container-fluid");

    for (var i = 9; i <= 17; i++) {
      var timeBlock = $("<div>").attr("id", "hour-" + i).addClass("row time-block");
      var hourDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(i + "AM");
      var period = i < 12 ? "AM" : "PM";
      var displayHour = i <= 12 ? i : i - 12;
      hourDiv.text(displayHour + " " + period);

      var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
        .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"));
      var textArea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3")
        .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"));

        timeBlock.append(hourDiv, textArea, saveButton);
        container.append(timeBlock);
    }
    $(".row.time-block.example").remove();
  }

  updateCurrentDate();
  generateTimeBlocks();
  colorCodeTimeBlocks();
  retrieveAndSetUserInput();
});



    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.


//testing push


