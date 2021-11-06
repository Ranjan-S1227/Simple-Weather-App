const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
const https = require("https")

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html" );
});

app.post("/" , function(req,res){
console.log(req.body.cityName);
const query = req.body.cityName;
const apiKey ="42360887605276fcf8623a056e12d577";
const uns = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ uns + "&appid=" + apiKey
https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data" , function(data){
const weatherData = JSON.parse(data);
console.log(weatherData);

const temp = weatherData.main.temp;
console.log(temp);
const weatherDesc = weatherData.weather[0].description;
console.log(weatherDesc);

const icon = weatherData.weather[0].icon;
const imageurl ="http://openweathermap.org/img/wn/"+icon+"@2x.png"

res.write("<h1>The Temperature in "+ query+" is" + " " + temp + " " + "degress Celcius.</h1>");
res.write("<h3><em>The Weather is currently" + " " + weatherDesc + ".</em></h3>" );
res.write("<img src=" + imageurl + ">");
res.send()

});



})
});


app.listen(3000 , function(){
console.log("Server is running on port 3000.")  
});