import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "mclovin";
const yourPassword = "boerboel";
const yourAPIKey = "f873695c-3c32-466c-bd57-9fd6d84c9c37";
const yourBearerToken = "157ea41e-afa4-4fa0-85da-c433d7ca737b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  }catch(error){
    res.status(404).send("Error: " + error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2",
  {auth: {
    username:yourUsername,
    password:yourPassword,
  }});
  res.render("index.ejs", {content: JSON.stringify(response.data)});

});

app.get("/apiKey", async (req, res) => {
  const response = await axios.get("https://secrets-api.appbrewery.com/filter?score=5&apiKey="+yourAPIKey);
  res.render("index.ejs", {content: JSON.stringify(response.data)});
});

app.get("/bearerToken", async (req, res) => {
  const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42",{
    headers:{
      Authorization: `Bearer ${yourBearerToken}`
    }
  });
  res.render("index.ejs", {content: JSON.stringify(response.data)});  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
