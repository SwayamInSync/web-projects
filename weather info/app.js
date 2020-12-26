//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function (req,res) {
  res.sendFile(__dirname+"/weather.html");

});

app.post("/", function(req,res){

  const apikey="e2ca4fc7110253b58df9c834de865ed5";
  const unit = "metric";
  const city = req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apikey+"&units="+unit;
  console.log(city);
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function (data){
      const weather_data = JSON.parse(data);
      const temp = weather_data.main.temp;
      const description = weather_data.weather[0].description;
      const icon = "https://openweathermap.org/img/wn/"+weather_data.weather[0].icon+"@2x.png";
      console.log(temp);
      result = "The temp of "+city+" is "+temp+"°C";
      res.render("data", {result1:result, icon:icon, condition:description});

      // res.write("<h1> The Temperature in "+city+" is "+temp+" degree Celsius</h1>");
      // res.write("<p>The Weather Conditions are: <b>"+description+"</b></p>");
      // res.write("<img src="+icon+">");
      // res.write("<h3>Thanks For Using My App</h3>");
      // res.send();

    });
  });

});



app.listen(process.env.PORT || 3000, function () {
  console.log("server is running");
});
