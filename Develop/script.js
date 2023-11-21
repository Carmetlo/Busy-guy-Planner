// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  function updateCurrentDate() {
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $("#currentDay").text(currentDate);
  }

  function colorCodeTimeBlocks() {
    var currentHour = dayjs().format('H');

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $this.removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $this.removeClass("past future").addClass("present");
      } else {
        $this.removeClass("past present").addClass("future");
      }
    });
  }

  $(".saveBtn").on("click", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(blockId, eventText);
  });
  
  function retrieveAndSetUserInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedEventText = localStorage.getItem(blockId);

      if (savedEvent) {
        $(this.find(".description")).val(savedEvent);
      }
    });
  }

  function generateTimeBlocks() {
    var container = $(".container-fluid");

    for (var i = 9; i <= 17; i++) {
      var timeBlock = $("<div>").attr("id", "hour-" + i).addClass("row time-block");
      var hourDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(i + "AM");
      var textArea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3")
        .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"));

        timeBlock.append(hourDiv, textArea, saveBtn);
        container.append(timeBlock);
    }
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


