
var headerDate = moment().format("dddd, MMMM Do");

$("#currentDay").text(headerDate)

var hourChunks = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

tasks = [];

var displayHourChunks = function () {
    for (var i = 0; i < hourChunks.length; i++) {
        var hourChunk = hourChunks[i];
        var timeBlock = $("<div>").addClass("row time-block");

        

        var hourDiv = $("<div>").addClass("hour col-1").text(hourChunk);


        var taskArea = $("<textarea>").addClass("col-10").attr("id", hourChunk);
        var relTime = checkTime(taskArea);
        var taskArea = taskArea.addClass(relTime);


        var save = $("<div>").addClass("saveBtn col-1").append("<button>");

        // add timeblock to the .container element
        timeBlock.append(hourDiv, taskArea, save);
        $(".container").append(timeBlock);
    }
};

var checkTime = function (timeBlockEl) {

    var blockTime = $(timeBlockEl).attr("id");
    var currTime = moment().format("hA");


    // var blockTime = moment().format("dddd") + " " + $(timeBlockEl).attr("id");
    
    // extract hour from current time in format that matches format from the time block
    // var currTime = moment().format("dddd") + " " +  moment().format("hA");

    console.log("BLOCK TIME:",blockTime,"; CURR TIME:",currTime);

    // compare time for the time block to the current moment
    if (currTime > blockTime) {
        var relBlockTime = "past"
    }
    else if (currTime === blockTime) {
        var relBlockTime = "present"
    }
    else if (currTime < blockTime){
        var relBlockTime = "future"
    }
    console.log(relBlockTime);
    return relBlockTime;

};

$(".container").on("click", "button", function (event) {
    event.preventDefault;
    
    var btnDivEl = $(this).closest("div");
    var textAreaEl = btnDivEl.siblings("textarea");
    console.log("TEXTAREA",textAreaEl);

    var task = textAreaEl.val();
    var taskTime = textAreaEl.attr("id");
    console.log(task, taskTime);

    var timeTask = {"time":taskTime, "task":task};
    tasks.push(timeTask);
    saveTasks();

});

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


displayHourChunks();