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

var scheduleEl = $("#schedule"); 
var plannerData = [];   

var currentDate = moment().format('dddd[,] MMMM Do[,] YYYY');
$("#displayDate").text(currentDate); 

var currentHour = moment().hour(); 
console.log("current hour: " + currentHour);  


function displayDay() {
    scheduleEl.html(""); 

    var calendarDataAsString = localStorage.getItem("calendarData"); 
    console.log("stored data:" + calendarDataAsString);  
    if (calendarDataAsString === null) {
        for (var h=0; h< 9; h++) {
            plannerData[h] = ""; 
        }
    }
    else {
        plannerData = JSON.parse(localStorage.getItem("calendarData")); 
    }
     
    var hourText; 
    var ampm; 
    for (var i=0; i < plannerData.length; i++) {
        
        var hour = i + 9; 
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
        taskBox.text(plannerData[i]); 
        newRow.append(taskBox); 
        
        var saveButton = $("<button>").addClass("save button col col-2 col-sm-1").append("<i class='fa fa-save fa-2x pt-2 d-none d-md-block'>").append("<i class='fa fa-save pt-2 d-block d-md-none'>");
        saveButton.attr("data-index", i);  
        newRow.append(saveButton);  
        
        if (currentHour > i + 9) {
            // hour is past 
            taskBox.addClass("tasks-past"); 
            //  lock down the row
            saveButton.children('i').each(function () {
                $(this).removeClass("fa-save"); 
                $(this).addClass("fa-lock ");  
            });
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

displayDay();  

console.log($(".tasks"));  

$(".save").on("click", function(event) {
    var hourIndex = $(this).attr("data-index"); 
    // console.log("Save clicked for hourIndex: " + hourIndex);  
    tasksId = "#tasks" + hourIndex; 
    var saveText = $(tasksId).val();
    plannerData[hourIndex] = saveText; 
    
    calendarDataAsString = JSON.stringify(plannerData); 
    localStorage.setItem("calendarData", calendarDataAsString);    
})
