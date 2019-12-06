var currentDate = moment().format('dddd[,] MMMM Do[,] YYYY');
$("#displayDate").text(currentDate); 

var currentHour = moment().hour(); 
console.log("current hour: " + currentHour);  

$(".save").on("click", function(event) {
    // find out which hour's save button was clicked  

})