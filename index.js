import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
const apiKey = "";
let latitude = 0;
let longitude = 0;
let cityName = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req,res)=>{
    res.render("index.ejs"), {
        cityNameH1: "Welcome! Enter a city name!"
    };
});

app.post("/submit", async (req,res)=>{
    cityName = req.body.cityName;
    try{
        const mainlyUrl = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=${apiKey}`);
        longitude = mainlyUrl.data[0].lon;
        latitude = mainlyUrl.data[0].lat;
        res.render("index.ejs", {
            cityNameH1: cityName,
            key: "yes"
        });
    }catch(error){
        console.log(error.message);
    }
});

app.get("/parameters", async (req,res)=>{
    try{
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const tempMax = Math.floor(result.data.main.temp_max - 273);
        const tempMin = Math.floor(result.data.main.temp_min - 273);
        res.render("index.ejs", {
            key: "yes",
            cityNameH1: cityName,
            willItRain: result.data.weather[0].main,
            intensity: result.data.weather[0].description,
            tempMax: tempMax,
            tempMin: tempMin, 
            cloudPercentage: result.data.clouds.all
        });
    }catch(error){
        console.log(error.message);
    }
});

app.listen(port, () =>{
    console.log(`Listening to port: ${port}`);
});