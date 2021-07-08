const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String, 
    title: String,
    pubDate: String,
    numOfPage: Number,
    language: String,
    author: [Number],
    publication: Number,
    category: [String],
});

// Create a book model
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;