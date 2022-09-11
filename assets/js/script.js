var date = moment();

var headerDate = moment().format("dddd, MMMM Do");

$("#currentDay").text(headerDate)

var hourChunks = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

var displayHourChunks = function () {
    for (var i = 0; i < hourChunks.length; i++) {
        var hourChunk = hourChunks[i];
        var timeBlock = $("<div>").addClass("row time-block").attr("id", hourChunk);

        var relTime = checkTime(timeBlock);
        
        var hourDiv = $("<div>").addClass("hour col-1").text(hourChunk);
        var taskArea = $("<textarea>").addClass("col-10").addClass(relTime);
        var save = $("<div>").addClass("saveBtn col-1").append("<button>");

        // add timeblock to the .container element
        timeBlock.append(hourDiv,taskArea,save);
        $(".container").append(timeBlock);
    }
};

var checkTime = function(timeBlockEl) {
    var blockTime = $(timeBlockEl).attr("id");
    var currTime = moment().format("hA");

    // compare time for the time block to the current moment
    if (currTime > blockTime) {
        var relBlockTime = "past"
    } 
    else if (currTime === blockTime) {
        var relBlockTime = "present"
    }
    else {
        var relBlockTime = "future"
    }
    return relBlockTime;

};



displayHourChunks();