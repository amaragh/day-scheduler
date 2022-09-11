
var headerDate = moment().format("dddd, MMMM Do");

$("#currentDay").text(headerDate)

// var hourChunks = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

var hourChunks = [9, 10, 11, 12, 13, 14, 15, 16, 17];

tasks = [];

var displayHourChunks = function () {
    for (var i = 0; i < hourChunks.length; i++) {
        var hourChunk = hourChunks[i];
        hourChunkFormatted = moment().set("hour", hourChunk).format("hA");
        var timeBlock = $("<div>").addClass("row time-block");

        var hourDiv = $("<div>").addClass("hour col-1").text(hourChunkFormatted);

        // determine if 'i' time block is past, present, future in relation to current moment
        var relTime = checkTime(hourChunk);

        var taskArea = $("<textarea>").addClass("col-10 description").attr("id", hourChunkFormatted);
        taskArea.addClass(relTime);

        var save = $("<div>").addClass("saveBtn col-1").append("<button><i class='far fa-save'></i></button>");

        // add timeblock to the .container element
        timeBlock.append(hourDiv, taskArea, save);
        $(".container").append(timeBlock);
    }

    loadTasks();
    saveTasks();
};

var checkTime = function (timeBlockEl) {

    var blockTime = moment().set("hour", timeBlockEl).format("HH");
    // extract hour from current time in format that matches format from the time block
    var currTime = moment().format("HH");

    console.log("BLOCK TIME:", blockTime, "; CURR TIME:", currTime);

    // compare time for the time block to the current moment
    if (currTime > blockTime) {
        var relBlockTime = "past"
    }
    else if (currTime === blockTime) {
        var relBlockTime = "present"
    }
    else if (currTime < blockTime) {
        var relBlockTime = "future"
    }
    console.log(relBlockTime);
    return relBlockTime;

};

$(".container").on("click", "button", function (event) {
    event.preventDefault;

    var btnDivEl = $(this).closest("div");
    var textAreaEl = btnDivEl.siblings("textarea");

    var task = textAreaEl.val();
    var taskTime = textAreaEl.attr("id");
    console.log(task, taskTime);

    var timeTask = { "time": taskTime, "task": task };
    tasks.push(timeTask);
    saveTasks();
});

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
    savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!savedTasks) {
        var savedTasks = [];
    }
    console.log(savedTasks);

    for (var i = 0; i < savedTasks.length; i++) {
        var task = savedTasks[i].task;
        var time = savedTasks[i].time;
        console.log("savedTask",task, "; savedTime",time)

        console.log($("textarea[id='" + time + "']"));

        textArea = $("textarea[id='" + time + "']");

        if(textArea){
            textArea.text(task);
        }
    }
    tasks =savedTasks;
};
displayHourChunks();

