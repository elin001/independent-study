// Set the date we're counting down to (May 10, 2024 7:00 PM)
var countDownDate = new Date("May 10, 2024 19:00:00").getTime();

// Update the countdown and display the elapsed time every 1 second
var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Calculate the time remaining until the countdown date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds for the countdown
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown in the element with id "countdown"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, display a message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Ellie graduated";
    }

    // Calculate the time elapsed since the event (May 10, 2024 7:00 PM)
    var eventDate = new Date("May 10, 2024 19:00:00").getTime();
    var elapsedTime = now - eventDate;

    // Calculate the elapsed days, hours, minutes, and seconds
    var elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    var elapsedHours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    // Display the elapsed time in the element with id "elapsed-time"
    document.getElementById("elapsed-time").innerHTML = "Ellie graduated " + elapsedDays + "d " + elapsedHours + "h " + elapsedMinutes + "m " + elapsedSeconds + "s ago";

}, 1000);
