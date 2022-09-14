
var headerDate = moment().format("dddd, MMMM Do");

$("#currentDay").text(headerDate)

// array of desired time bock times in 24-hour
var hourChunks = [9, 10, 11, 12, 13, 14, 15, 16, 17];

tasks = [];

// function to dynamically generate time blocks and display them on the page
var displayHourChunks = function () {
    for (var i = 0; i < hourChunks.length; i++) {
        var hourChunk = hourChunks[i];
        // time format to be displayed on time block
        hourChunkFormatted = moment().set("hour", hourChunk).format("hA");

        var timeBlock = $("<div>").addClass("row time-block");
        var hourDiv = $("<div>").addClass("hour col-1").text(hourChunkFormatted);

        var taskHolder = $("<div>").addClass("col-10 description p-0");
        var taskArea = $("<textarea>").attr("id", hourChunk);
        taskHolder.append(taskArea)

        // save button
        var save = $("<div>").addClass("saveBtn col-1").append("<button><i class='far fa-save'></i></button>");

        // add timeblock to the .container element
        timeBlock.append(hourDiv, taskHolder, save);
        $(".container").append(timeBlock);
    }
    // load saved tasks to page from localStorage
    loadTasks();
    saveTasks();
};

// function to save task to localStorage when save icon is clicked
$(".container").on("click", "button", function (event) {
    event.preventDefault;
    // find textarea element within the timeblock for this button
    var btnDivEl = $(this).closest("div");
    var textAreaDivEl = btnDivEl.siblings(".description");
    var textAreaEl = textAreaDivEl.find("textarea");

    var task = textAreaEl.val();
    var taskTime = textAreaEl.attr("id");

    // check if the existing tasks array contains a value for this time block
    var timeExistsObj = tasks.find(obj => obj.time === taskTime);
    // check if there is already a saved task in the tasks array
    if (timeExistsObj) {
        // find index of existing task object
        var index = tasks.indexOf(timeExistsObj);
        // replace exiting task in tasks array
        tasks[index].task = task;
    }
    else {
        // create new task
        var timeTask = { "time": taskTime, "task": task };
        tasks.push(timeTask);
    }

    saveTasks();
});

// saves tasks to localStorage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

//  retrieves tasks from localStorage
var loadTasks = function () {
    savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!savedTasks) {
        var savedTasks = [];
    }

    for (var i = 0; i < savedTasks.length; i++) {
        var task = savedTasks[i].task;
        var time = savedTasks[i].time;

        // locate textarea element that has the corresponding id value for this time
        textArea = $("textarea[id='" + time + "']");

        textArea.text(task);
    }
    tasks = savedTasks;
};


//  function loops through all text areas to compare time for the text area's time block to the current time
var checkTimeText = function () {
    // array of all textarea elements
    var textAreas = $("textarea");
    // current time
    var currTime = moment().hour();

    for (var i = 0; i < textAreas.length; i++) {
        var textArea = $(textAreas[i])
        // extract timeblock time which is stored as id on textarea element
        var blockTime = textArea.attr("id");
        // clear class on textarea in prep for adding the updated class
        textArea.removeClass();

        // compare time for the time block to the current moment and update the class based on result
        if (currTime > blockTime) {
            textArea.addClass("past");
        }
        else if (currTime === blockTime) {
            textArea.addClass("present");
        }
        else if (currTime < blockTime) {
            textArea.addClass("future");
        }
    }
};

// load all time blocks to the page
displayHourChunks()

// initial time check on time blocks to display initial color code
checkTimeText();

// evaluation of time every minute to keep task colors up to date by the minute
setInterval(function() {checkTimeText()}, 60000);