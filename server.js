//Import dependancies
const express = require('express');
const app = express();
const mysql= require('mysql2')
const dotenv =require('dotenv')

//configure the environment variables
dotenv.config();

// Question 1 goes here
//Retrieve all patients
app.get('/', (req,res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, results) =>{
        //if error
        if(err){
            return res.status(400).send("Failed to get patients", err)
        }
        //if no error
        res.status(200).send(results)
    })
})

// // Question 2 goes here
//Retrieve all providers
app.get('/', (req,res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, results) =>{
        //if error
        if(err){
            return res.status(400).send("Failed to get patients", err)
        }
        //if no error
        res.status(200).send(results)
    })
})

// Question 3 goes here
//Filter patients by First Name
app.get('/', (req, res) => {
    const { first_name } = req.query;
    const getPatientsByFirstName = "SELECT first_name FROM patients";
    db.query(getPatientsByFirstName, [first_name], (err, results) => {
        //if error
        if (err) {
            return res.status(400).send("Failed to get patients", err);
        }
        //if no error
        res.status(200).send(results);
    });
});

// Question 4 goes here
//Retrieve all providers by their specialty
app.get('/', (req, res) => {
    const { provider_specialty } = req.query;
    const getProvidersBySpecialty = "SELECT first_name, provider_specialty FROM providers";
    db.query(getProvidersBySpecialty, [provider_specialty], (err, results) => {
        //if error
        if (err) {
            return res.status(400).send("Failed to get providers", err);
        }
        //if no error
        res.status(200).send(results);
    });
});

  

//Configure the database connection and test the connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//test the connection
db.connect((err) =>{
    //if there is no connection
    if(err) {
    console.log('Error connecting to database', err);
    return;
}
    //connection is successful
    console.log('successfully connected to mysql')
})

//start and listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
//sending message to the browser//
app.get ('/', (req,res) =>{
    res.send ('Server started successfully!')
})