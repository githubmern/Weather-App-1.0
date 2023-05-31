$(document).ready(function(){

    const d = new Date(); 

    // To get Current Time
    const getCurrentTime = () => {
        let hours = d.getHours();
        let min = d.getMinutes();  

        if(hours > 12){
            hours -= 12;
            if(hours < 10){
            hours = "0"+hours;
            }
        } 

        if(min < 10){
            min = "0"+min;
        } 
        return `${hours}:${min}`; 
    }

    // To get Current Date
    const getCurrentDate = () => {

        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 

        const year = d.getFullYear().toString().substr(-2);
        const month = months[d.getMonth()];
        const day = weekday[d.getDay()];
        const date = d.getDate();
        
        return `- ${day}, ${year} ${month} '${date}`; 
    } 
    
    $(".dateTime").html(`${getCurrentTime()} ${getCurrentDate()}`); 

    $("#submitBtn").click( async(e) => {
        
        e.preventDefault();

        let APIKEY = "4b8709b7c005a5c6adcadb25b6b2af53";
        let cityname = $("#location").val();
        
        if(cityname === ""){  
            $(".error_msg").html("* Please Fill Location!"); 
            $(".temp").html("");
            $(".location").html("");  
            
        } else {

            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${APIKEY}`;
                const response = await fetch(url); 
                const objData = await response.json();
                const arrData = [objData];  

                const tempStatus = arrData[0].weather[0].main;
                const tempDesc = arrData[0].weather[0].description;
                const locaName = arrData[0].name;
                const wind = arrData[0].wind.speed;
                const humidity = arrData[0].main.humidity; 
                const clouds = arrData[0].clouds.all;  

                // To get Sunrise Time
                const getSunriseTime = () => {
                    let sunrise = new Date(arrData[0].sys.sunrise);
                    let sunriseHour = sunrise.getHours();
                    let sunriseMin = sunrise.getMinutes();
                    let sunriseSec = sunrise.getSeconds();
                    let periods = (sunriseHour > 12)? "PM": "AM"; 
                
                    if(sunriseHour > 12){
                        sunriseHour -= 12;
                        if(sunriseHour < 10){
                            sunriseHour = "0"+sunriseHour;
                        }
                    } 
                
                    if(sunriseMin < 10){
                        sunriseMin = "0"+sunriseMin;
                    }
                    
                    if(sunriseSec < 10){
                        sunriseSec = "0"+sunriseSec;
                    }

                    return `${sunriseHour}:${sunriseMin}:${sunriseSec} ${periods}`; 
                } 

                // To get Sunset Time
                const getSunsetTime = () => {
                    let sunset = new Date(arrData[0].sys.sunset);
                    let sunsetHour = sunset.getHours();
                    let sunsetMin = sunset.getMinutes();
                    let sunsetSec = sunset.getSeconds();
                    let periods = (sunsetHour > 12)? "PM": "AM"; 
                
                    if(sunsetHour > 12){
                        sunsetHour -= 12;
                        if(sunsetHour < 10){
                            sunsetHour = "0"+sunsetHour;
                        }
                    } 
                
                    if(sunsetMin < 10){
                        sunsetMin = "0"+sunsetMin;
                    }
                    
                    if(sunsetSec < 10){
                        sunsetSec = "0"+sunsetSec;
                    }

                    return `${sunsetHour}:${sunsetMin}:${sunsetSec} ${periods}`; 
                }
                
                const sunriseTime = getSunriseTime();                
                const sunsetTime = getSunsetTime();  

                console.log(arrData);

                // condition to check sunny or cloudy
                if(tempStatus == 'Clear'){
                    if(tempDesc == "clear sky"){
                        $("#temp_status").html(`<h3 class='fas fa-sun mt-4' style="font-size: 31px;"></h3><small>${tempDesc}</small>`);
                    }  
                } else if(tempStatus === 'Sunny'){ 
                    $("#temp_status").html(`<h3 class='fas fa-sun mt-4'></h3><small>${tempDesc}</small>`); 
                } else if(tempStatus === 'Clouds'){ 
                    if(tempDesc == "scattered clouds"){ 
                        $("#temp_status").html(`<h3 class='fa-brands fa-cloudflare mt-4' style='font-size: 31px;'></h3><small>${tempDesc}</small>`);  
                    } else if(tempDesc === "overcast clouds"){ 
                        $("#temp_status").html(`<h3 class='fa-solid fa-cloud-meatball mt-4' style="font-size: 31px;"></h3><small>${tempDesc}</small>`);  
                    } else if(tempDesc == "few clouds"){ 
                        $("#temp_status").html(`<h3 class='fa-solid fa-cloud mt-4' style="font-size: 31px;"></h3><small>${tempDesc}</small>`);  
                    } else if(tempDesc === "broken clouds"){ 
                        $("#temp_status").html(`<h3 class='fa-solid fa-cloud-bolt mt-4' style="font-size: 31px;"></h3><small>${tempDesc}</small>`);   
                    }   
                } else if(tempStatus === 'Rain'){ 
                    $("#temp_status").html(`<h3 class='fas fa-cloud-rain mt-4'></h3><small>${tempDesc}</small>`); 
                } else if(tempStatus === "Haze"){ 
                    if(tempDesc === "haze"){
                        $("#temp_status").html(`<h3 class='fas fa-smog mt-4' style="font-size: 31px;"></h3><small>${tempDesc}</small>`);
                    }  
                }   

                $(".temp").html(arrData[0].main.temp+'&#176;');
                $(".location").html(locaName); 
                $(".clouds").html(clouds);
                $(".wind").html(wind);
                $(".humidity").html(humidity); 
                $(".sunriseTime").html(sunriseTime); 
                $(".sunsetTime").html(sunsetTime); 
                
                
                $(".error_msg").html("");  

            } catch (error) {
                $(".error_msg").html("* Please Fill Proper Location Name!"); 
                $(".temp").html("");
                $(".location").html("");
                $("#temp_status").html(""); 
           } 
           
        } 
    });
  });