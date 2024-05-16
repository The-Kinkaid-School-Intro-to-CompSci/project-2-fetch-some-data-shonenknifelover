function displayTimes(prayerTimes){
    let 
}


async function getLocation(){

    //get what the user wrote
    const searchBar = document.querySelector('#searchBar');
    let city = searchBar.value; 
    const apiURL = `https://prayertimes.api.abdus.dev/api/diyanet/search?q=${city}`

    console.log(apiURL);
    let locationsList = null;

    try {
        const response = await fetch(apiURL);
        locationsList = await response.json();
        console.log(locationsList);
        const idObject = locationsList[0].id 
        console.log(idObject);

        getTimes(idObject);
    }
    catch(error){
        console.log('error', error);
    }
     

}

async function getTimes(id){
    const apiURL = `https://prayertimes.api.abdus.dev/api/diyanet/prayertimes?location_id=${id}`;
    const localJSON = 'prayertimes.json';

    console.log(apiURL);
    let prayerTimes = null;
    try {
        const response = await fetch(localJSON);
        prayerTimes = await response.json();
        console.log(prayerTimes);
    }

    catch(error){
        console.log('error', error);
    }

    displayTimes(prayerTimes);
}



function runProgram(){

    // getTimes();
    const searchButton = document.querySelector('#submitButton'); 
    searchButton.addEventListener('click', getLocation);
    console.log('runProgram');
    //your code goes here
}
document.addEventListener('DOMContentLoaded', runProgram);