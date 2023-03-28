$("#add-city").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box - city
    var city = $("#city-input").val();



    // This is our API key: MK- entered my API key from website
    var APIKey = "68498a4d04f4da5284313a372d17c548";

    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // 5 day forecast 
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // UV index ajax
        // $.ajax({
        //     url: queryURLUv,
        //     method: "GET"
        // })

        .then(function (response) {
            var cityName = ('<li class="list-group-item"><span href="#"class="stretched-link">'+(response.name)+'</span></li>');
            
            $(".list-group").append(cityName)
            // $(".list-group-item").text(JSON.stringify(response));
            console.log(response.name)

            // Main CITY results details:
            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            //get picture for the icon
            var iconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
            console.log(iconURL)
            // Transfer content to HTML
            $(".cityNameD").html("City: " + response.name + "<span><img src=" + iconURL + "></img></span>");
            $(".humidityD").text("Humidity: " + response.main.humidity);
            $(".windD").text("Wind Speed: " + response.wind.speed);
            // check the uv index response - couldnt find in example.


            // Convert the temp to fahrenheit
            var tempD = (response.main.temp - 273.15) * 1.80 + 32;
            // add temp content to html
            $(".temp").text("Temperature (K) " + response.main.temp);
            $(".tempD").text("Temperature (F) " + tempD.toFixed(2));
            // Log the data in the console as well
            console.log("City: " + response.name);

            console.log("Humidity: " + response.main.humidity);
            console.log("Wind Speed: " + response.wind.speed);

            //Lat and Lon 
            var lat = response.coord.lat
            var lon = response.coord.lon

            var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
            //uv index ajax
            // UV index ajax
            $.ajax({
                url: queryURLUv,
                method: "GET"
            }).then(function (response) {

                // Storing the rating data
                var uvIndexD = response.value;

                // Creating an element to have the rating displayed
                $(".uvIndexD").text("UV Index: " + uvIndexD);

                console.log("UV Index: " + uvIndexD);
                console.log("Temperature (F): " + tempD);


                // 5DAY    Here we run our AJAX call to 5 day forecast link:
                $.ajax({
                    url: queryURL5,
                    method: "GET"
                })
                     //Day1
                    .then(function (response) {

                        for(var i=0;i<response.list.length;i++){

                       
                        console.log(response.list[i]);  
                        // Log the queryURL
                        console.log(queryURL);
                        // Log the resulting object
                        console.log(response.list,"response");
                        // Transfer content to HTML
                        $(".dt").text(" " + response.list[i].dt_txt);
                        //get picture for the icon
                        var iconURL = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png"
                        console.log(iconURL)
                        // Transfer content to HTML
                        $(".icon").attr("src", iconURL);
                        $(".humidity5").text(" " + response.list[i].main.humidity);
                        // Convert the temp to fahrenheit
                        var temp5 = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                        // add temp content to html
                        $(".temp").text("Temperature (K) " + response.list[i].main.temp);
                        $(".temp5").text("Temperature (F) " + temp5.toFixed(2));
                        // Log the data in the console as well
                        console.log(" " + response.list[i].dt_txt);
                        console.log(" " + response.list[i].weather.icon);
                        console.log(" " + response.list[i].main.humidity);
                        console.log(" " + temp5);

                        //day 2


                        
                        }

                    });
                    
                        
            });

        });
});