const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function (req,res) {
  res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req,res){

  const apikey="e2ca4fc7110253b58df9c834de865ed5";
  const unit = "metric";
  const city = req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apikey+"&units="+unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function (data){
      const weather_data = JSON.parse(data);
      const temp = weather_data.main.temp;
      const description = weather_data.weather[0].description;
      const icon = "https://openweathermap.org/img/wn/"+weather_data.weather[0].icon+"@2x.png";

      res.write("<h1> The Temperature in "+city+" is "+temp+" degree Celsius</h1>");
      res.write("<p>The Weather Conditions are: "+description+"</p>");
      res.write("<img src="+icon+">");
      res.send();

    });
  });

});



app.listen(3000, function () {
  console.log("server is running");
});
