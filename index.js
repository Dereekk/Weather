window.onload=function(){
    var btn = document.querySelector('input');
    btn.addEventListener('click', weather);
}

var url = "https://api.openweathermap.org/data/2.5/weather?id=5946768&APPID=bd0b7c042d9a582253db55905fc1a01d";

function weather(){
    $.ajax({
        url: url,
        success: function (result) {
            "use strict";
            if("main" in result){
                $(".temp").text(result.main.temp)
            }

            if("name" in result){
                $(".name").text(result.name)
            }
            if("weather" in result){
                $(".desc").text(result.weather["0"].description)
            }

        }
    });
}
