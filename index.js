require("dotenv").config();

// Framework
const express = require("express");
const mongoose = require("mongoose");

// Database 
const database = require("./database/index");

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

/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/

booky.get("/", (req,res) => {
    // restarting due to change
    return res.json({books: database.books });
});

/*
Route           /is
Description     Get specific books based on isbn
Access          Public
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", (req, res) => {
const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn );

if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the ISBN of ${req.params.category}`,});
}
return res.json({ book: getSpecificBook });

});

/*
Route           /c
Description     Get specific books based on category
Access          Public
Parameter       category
Methods         GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category) );
    
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the category of ${req.params.category}`,});
    }
    return res.json({ book: getSpecificBook });
    
    });

    /*
Route           /lang
Description     Get specific books based on language
Access          Public
Parameter       language
Methods         GET
*/
booky.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.language === req.params.language );
    
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for language of ${req.params.language}`,});
    }
    return res.json({ book: getSpecificBook });
    
    });

    /*
Route           /author
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/

booky.get("/author", (req,res) => {
    return res.json({books: database.books });
});

    /*
Route           /author
Description     Get specific books based on author
Access          Public
Parameter       authorid
Methods         GET
*/
booky.get("/author/book/:authorId", (req, res) => {
    const getSpecificbooks = database.author.filter((authorId) => authorId.id === parseInt(req.params.authorId));
    
    if(getSpecificbooks.length === 0){
        return res.json({error: `No book found for the author Id of ${req.params.authorId}`,});
    }
    return res.json({ authorId: getSpecificbooks });
    
    });

        /*
Route           /author/book/
Description     get list of authors based on books
Access          Public
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No book found for the author Id of ${req.params.isbn}`,});
    }
    return res.json({ book: getSpecificAuthor });
    
    });

       /*
Route           /publications
Description     Get all publications
Access          Public
Parameter       None
Methods         GET
*/

booky.get("/publications", (req,res) => {
    return res.json({publications: database.publication });
});


        
// Route           /publictions/book/:publications
// Description     Get specific books based on publications
// Access          Public
// Parameter       publications
// Methods         GET

booky.get("/publications/book/:publications", (req, res) => {
     const getSpecificPublication = database.publication.filter((publications) =>publications.id === parseInt(req.params.publications));
    
    if(getSpecificPublication.length === 0){
        return res.json({error: `No book found for the author Id of ${req.params.publications}`,});
    }
    return res.json({ publications: getSpecificPublication });
    
    });

            /*
Route           /publication/book/
Description     Get specific publications based on isbn
Access          Public
Parameter       isbn
Methods         GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publications) => public.books.includes(req.params.isbn));
    
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No book found for the author Id of ${req.params.isbn}`,});
    }
    return res.json({ book: getSpecificAuthor });
    
    });

          /*
Route           /book/add
Description     add new book
Access          Public
Parameter       None
Methods         POST
*/

booky.post("/book/add", (req,res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({books: database.books });
});

         /*
Route           /author/add
Description     add new author
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/author/add", (req,res) =>{
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({authors: database.author });
});


         /*
Route           /publication/add
Description     add new publication
Access          Public
Parameter       None
Methods         POST
*/
booky.post("/publication/add", (req,res) =>{
    const { newPublication } = req.body;
    database.publication.push(newPublication);
    return res.json({publications: database.publication });
});


          /*
Route           /book/update/title/
Description     add book title
Access          Public
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/title/:isbn", (req,res) => {
   database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn){
          book.title = req.body.newBookTitle;
             return;
        }
   });
   return res.json({books : database.books});
});

        /*
Route           /book/update/author/
Description     add authorId and Isbn
Access          Public
Parameter       isbn and authorId
Methods         PUT
*/

booky.put("/book/update/author/:isbn/:authorId", (req,res) => {
   
//    Update the book database
    database.books.forEach((book) => {
       if(book.ISBN === req.params.isbn){
           return book.author.push(parseInt(req.params.authorId));
         }
    });
    
    // Update author database
    database.author.forEach((author) =>{
    if(author.id === parseInt(req.params.authorId)){
        return author.books.push(req.params.isbn);
    }
    });
    return res.json({books : database.books, author: database.author });
 });

      /*
Route           /update/author/name/
Description     Update author name
Access          Public
Parameter       authorId
Methods         PUT
*/
booky.put("/update/author/name/:authorId", (req,res) => {
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            author.name = req.body.newAuthorName;
               return;
          }
     });
     return res.json({author : database.author});
});

    /*
Route           /update/publication/name/
Description     Update publication name
Access          Public
Parameter       pubId
Methods         PUT
*/
booky.put("/update/publication/name/:pubId", (req,res) => {
    database.publication.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            publication.name = req.body.newPubName;
               return;
          }
     });
     return res.json({publication : database.publication});
});


        /*
Route           /book/update/author/
Description     add authorId and Isbn
Access          Public
Parameter       isbn and authorId
Methods         PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
   
    //    Update the book database
        database.books.forEach((book) => {
           if(book.ISBN === req.params.isbn){
               book.publication = req.body.pubId;
               return;
             }
        });
        
        // Update publication database
        database.publication.forEach((publication) =>{
        if(publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
        });
        return res.json({books : database.books, publication: database.publication, message : "Successfully updated publication", });
     });

     
        /*
Route           /book/delete/
Description     delete a book
Access          Public
Parameter       isbn
Methods         DELETE
*/
    booky.delete("/book/delete/:isbn", (req,res) => {
        const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
       
        database.books =  updatedBookDatabase;
        return res.json({books: database.books });
    });

   /*
Route           /book/delete/author
Description     delete a author from a book
Access          Public
Parameter       isbn, author id
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) =>{
    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter((author) => author !== parseInt(req.params.authorId));
            book.author = newAuthorList;
            return;
        }
    });

    // database the author database
    database.author.forEach((author) =>{
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter((book) => book!== req.params.isbn);

            author.books = newBooksList;
            return;
        }
    });

    return res.json({
        message: " author was deleted",
        book: database.books,
        author: database.author,
    });
});

      /*
Route           /author/delete/
Description     delete a author
Access          Public
Parameter       author id
Methods         DELETE
*/
booky.delete("/author/delete/:authorId", (req,res) => {
    const updatedBookDatabase = database.author.filter((author) => author.id !== parseInt(req.params.authorId));
   
    database.author =  updatedBookDatabase;
    return res.json({author: database.author });
});

      /*
Route           /publication/delete/
Description     delete a publication
Access          Public
Parameter       pubid
Methods         DELETE
*/
booky.delete("/publication/delete/:pubId", (req,res) => {
    const updatedBookDatabase = database.publication.filter((publication) => publication.id !== parseInt(req.params.pubId));
   
    database.publication =  updatedBookDatabase;
    return res.json({publication: database.publication });
});

 /*
Route           /book/delete/publication
Description     delete a publication from a book
Access          Public
Parameter       isbn, pubid
Methods         DELETE
*/
booky.delete("/book/delete/publication/:isbn/:pubId", (req, res) =>{
    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = 0;
            return;
        }
    });

    // database the publication database
    database.publication.forEach((publication) =>{
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter((book) => book!== req.params.isbn);

            publication.books = newBooksList;
            return;
        }
    });

    return res.json({
        message: " publication was deleted",
        books: database.books,
        publication: database.publication,
    });
});


booky.listen(3000, () =>console.log("Hey! Server is running"));