
// converts to am and pm
function timeConversion(timeString){
    const usTime = timeString.substring(0,2);
    const minutes = timeString.substring(3,5);
    let numTime = Number(usTime);
    let period = "";
    if(numTime === "00:"){
        numTime += 12;
        period += "AM";
    }
    else if(numTime < 12){
        period += "AM";
    }
    else{
        numTime -= 12;
        period += "PM";
    }
    return `${numTime}:${minutes} ${period}`
}



function displayTimes(timesList){

  


    const todaysTimes = document.querySelector("#timesHeads");
    const timingsData = timesList.data.timings

    todaysTimes.textContent = `Fajr - ${timeConversion(timingsData.Fajr)} \nSunrise - ${timeConversion(timingsData.Sunrise)} \nDhur - ${timeConversion(timingsData.Dhuhr)} \nAsr - ${timeConversion(timingsData.Asr)} \nMaghrib - ${timeConversion(timingsData.Maghrib)} \nIsha - ${timeConversion(timingsData.Isha)}`;


}

async function getTimesFromLocation(position){

    //get what the user wrote
    const userDate = document.querySelector('#userDate');
    const date = userDate.value;
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`${latitude}, ${longitude}`)

    const apiURL = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?method=13&latitude=${latitude}&longitude=${longitude}`

    console.log(apiURL);
    let timesList = null;

    try {
        const response = await fetch(apiURL);
        timesList = await response.json();
        console.log(timesList);

    }
    catch(error){
        console.log('error', error);
    }
     
    displayTimes(timesList)

}

function askLocation(){
    if(!navigator.geolocation) {
        console.log("Your browser doesn't support Geolocation")
    }
    else {
        navigator.geolocation.getCurrentPosition(
            (position) => getTimesFromLocation(position),
            () => {},
            {maximumAge: 600000}
        );
    }
}


function runProgram(){

    // getTimes();
    const searchButton = document.querySelector('#submitButton'); 
    searchButton.addEventListener('click', askLocation);
    console.log('runProgram');
    //your code goes here
}
document.addEventListener('DOMContentLoaded', runProgram);