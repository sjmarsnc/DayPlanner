// index 0 is 9 am, 1 is 10 am, etc., up to 5 pm   
// var plannerData = [
//         "9 am tasks",
//         "10 am tasks",
//         "11 am tasks", 
//         "12 pm tasks",
//         "", 
//         "",
//         "3 pm tasks",
//         "4 pm tasks",
//         ""]
// ; 
var calendarData; 
calendarData = {  
    "d191207": [
                "9 am tasks",
                "10 am tasks",
                "11 am tasks", 
                "12 pm tasks",
                "", 
                "",
                "3 pm tasks",
                "4 pm tasks",
                ""], 
    "d191208": [
                "9 am day 2 tasks",
                "10 am day 2 tasks",
                "11 am day 2 tasks", 
                "12 pm day 2 tasks",
                "", 
                "",
                "3 pm day 2 tasks",
                "4 pm day 2 tasks",
                ""],   
    "d191209": [
                "9 am day 3 tasks",
                "10 am day 3 tasks",
                "11 am day 3 tasks", 
                "12 pm day 3 tasks",
                "", 
                "",
                "3 pm day 3 tasks",
                "4 pm day 3 tasks",
                ""],     
    "d1912010": [
                "9 am day 4 tasks",
                "10 am day 4 tasks",
                "11 am day 4 tasks", 
                "12 pm day 4 tasks",
                "", 
                "",
                "3 pm day 4 tasks",
                "4 pm day 4 tasks",
                ""]                       
}

var scheduleEl = $("#schedule"); 

var displayDate;  // text string of date being displayed 


var currentDay = moment().format('YYMMDD'); 
var dateKey = "d" + moment().format('YYMMDD'); 
var taskArray = []; 

var todayMoment = moment();  
var todayKey = dateKey;   // datekey for today 
var displayMoment = todayMoment;   // moment for day currently on display

function displayDay(dayMoment) {
    scheduleEl.html(""); 
    displayDate = dayMoment.format('dddd[,] MMMM Do[,] YYYY');
    $("#displayDate").text(displayDate); 
    dateKey = "d" + dayMoment.format('YYMMDD'); 
    
    var currentHour;  
    if (dayMoment.isBefore(todayMoment)) {
        currentHour = 20;  // before today, everything locked 
    }
    else if (dayMoment.isAfter(todayMoment)) {
        currentHour = 0;  // in future so everything available 
    }
    
    var currentHour = moment().hour() - 12;   // -12 so can test at night  
    
    


    var calendarDataAsString = localStorage.getItem("calendarMultiData"); 
    console.log("stored data:" + calendarDataAsString);  
    if (calendarDataAsString === undefined) { 
        for (var hour=9; hour < 18; hour++) {
            taskArray[hour-9] = ""; 
        }
        calendarData = { datekey: taskArray}
    }
    else {
        calendarData = JSON.parse(calendarDataAsString); 
    }
    
    dayData = calendarData[dateKey]; 
    console.log(dateKey);  
    console.log(dayData);    
    if (dayData === undefined) { 
        // create new entry for this day 
        taskArray = []; 
        for (var j=0; j < 9; j++) {
            taskArray[j] = ""; 
        }
        calendarData[dateKey] = taskArray;     
    }
    else { 
        taskArray = calendarData[dateKey];  
    }
    
    console.log(taskArray);   
    var hourText; 

    for (var i=0; i < taskArray.length; i++) {
        
        var hour = i + 9;   // for working at night 
        if (hour < 12 ) { 
            hourText = hour + " AM"; 
        }  
        else if ( hour === 12) {
            hourText = "12 PM"; 
        }
        else {
            hourText = (hour - 12) + " PM";  
        }
        
        var newRow = $("<div>").addClass("row hour-row"); 
        scheduleEl.append(newRow); 
        
        var hourBox = $("<div>").addClass("hour col col-2 col-sm-1"); 
        // need id? 
        hourBox.text(hourText); 
        newRow.append(hourBox); 
        
        var taskBox = $("<textarea>");
        taskBox.addClass("tasks col col-8 col-sm-10"); 
        taskBox.attr("id", "tasks" + i); 
        taskBox.attr("rows","3"); 
        taskBox.text(taskArray[i]); 
        newRow.append(taskBox); 
        
        var saveButton = $("<button>").addClass("save button col col-2 col-sm-1 fa fa-save fa-2x pt-2");
        saveButton.attr("data-index", i);  
        newRow.append(saveButton);  
        
        if (currentHour > i + 9) {
            // hour is past 
            taskBox.addClass("tasks-past"); 
            //  lock down the row
            saveButton.removeClass("fa-save fa-2x"); 
            saveButton.addClass("fa-lock fa-2x");  
            saveButton.attr("disabled", "true");  
            taskBox.attr("readonly", "true");    
        }
        else if (currentHour === i + 9) {
            taskBox.addClass("tasks-current");
        }
        else {
            taskBox.addClass("tasks-upcoming"); 
        }
    }
}

// set specific day to test 
// var testDay = moment(7,"DD"); 
// displayDay(testDay); 

displayDay(todayMoment);  

console.log($(".tasks"));  

$(".save").on("click", function(event) {
    var hourIndex = $(this).attr("data-index"); 
    // console.log("Save clicked for hourIndex: " + hourIndex);  
    tasksId = "#tasks" + hourIndex; 
    var saveText = $(tasksId).val();
    taskArray[hourIndex] = saveText; 
    
    calendarDataAsString = JSON.stringify(calendarData); 
    localStorage.setItem("calendarData", calendarDataAsString);    
})

$("#prevDay").on("click",function(event) {
    displayMoment = displayMoment.subtract(1, 'days'); 
    displayDay(displayMoment); 
})

$("#nextDay").on("click",function(event) {
    displayMoment = displayMoment.add(1, 'days'); 
    displayDay(displayMoment); 
})
