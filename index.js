import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
const apiKey = "ca9b56844a165bb48b4d0dadb541c592";
let cityName = 0;
let latitude = 0;
let longitude = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/submit", async (req,res)=>{
    cityName = req.body.cityName;
    console.log(cityName);
    try{
        const mainlyUrl = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=${apiKey}`);
        longitude = mainlyUrl.data[0].lon;
        latitude = mainlyUrl.data[0].lat;
        res.render("index.ejs");
    }catch(error){
        console.log(error.message);
    }
});

app.get("/parameters", async (req,res)=>{
    try{
        const tempMax = Math.floor(result.data.main.temp_max - 273);
        const tempMin = Math.floor(result.data.main.temp_min - 273);
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        console.log(mainlyUrl.data[0].lat, mainlyUrl.data[0].lon);
        res.render("index.ejs", {
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