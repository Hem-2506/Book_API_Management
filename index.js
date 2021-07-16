require("dotenv").config();

// Framework
const express = require("express");
const mongoose = require("mongoose");

// Database 
const database = require("./database/index");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Microservices Routes
const Books = require("./API/Book/");
const Authors = require("./API/Author/");
const Publications = require("./API/Publication/");

// Initialization
const booky = express();

// Configuration
booky.use(express.json());

// Establish Database Connection
mongoose
.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
)
.then(() => console.log("connection eshtablished!!!!!!!!!"));

booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);
  

booky.listen(3000, () =>console.log("Hey! Server is running"));