const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()

  const productRouter =require('./routes/index.js')

const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//------------ DB Configuration ------------//
const db = process.env.MongoURI;


//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

//For Reading JSON format 
app.use(express.json());

// app.use(bodyParser.json());
app.use("/", productRouter);



//Server is listenning that port
app.listen(PORT,()=>{
    console.log(`Backend Server running on PORT ${PORT}`);
})

