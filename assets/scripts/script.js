// index 0 is 9 am, 1 is 10 am, etc.  
var plannerData = [
        "9 am tasks",
        "10 am tasks",
        "11 am tasks", 
        "12 pm tasks",
        "", 
        "",
        "3 pm tasks",
        "4 pm tasks",
        ""]
; 

var scheduleEl = $("#schedule"); 

var currentDate = moment().format('dddd[,] MMMM Do[,] YYYY');
$("#displayDate").text(currentDate); 

var currentHour = moment().hour(); 
console.log("current hour: " + currentHour);  

$(".save").on("click", function(event) {
    // find out which hour's save button was clicked  
    // $(this).
    
})

function displayDay() {
    scheduleEl.html(""); 
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

        console.log(hourText); 
        var newRow = $("<div>").addClass("row hour-row"); 
        scheduleEl.append(newRow); 

        var hourBox = $("<div>").addClass("hour col col-2 col-sm-1"); 
        // need id? 
        hourBox.text(hourText); 
        newRow.append(hourBox); 
        
        var taskBox = $("<div>").addClass("col col-8 col-sm-10"); 
        taskBox.text(plannerData[i]); 
        newRow.append(taskBox); 
        
        var saveButton = $("<i>").addClass("save col col-2 col-sm-1 fa fa-save fa-2x pt-2");
        // how to add data-id
        newRow.append(saveButton);  
        
        if (currentHour > i+ 9) {
            // hour is past 
            taskBox.addClass("tasks-past");   
            //  lock down the row
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