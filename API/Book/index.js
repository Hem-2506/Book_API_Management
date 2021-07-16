//  Prefix : /book

// Initilizing Express Router
const Router = require("express").Router();

const BookModel = require("../../database/book");

/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         GET
*/

Router.get("/", async (req,res) => {
    // restarting due to change
    try{  const getAllBooks = await BookModel.find();
        return res.json(getAllBooks);}
catch(error){
    return res.json({ error: error.message});
}
   
});


/*
Route           /is
Description     Get specific books based on isbn
Access          Public
Parameter       isbn
Methods         GET
*/
Router.get("/is/:isbn", async (req, res) =>{
try{ const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn});
    
if(!getSpecificBook){
    return res.json({error: `No book found for the ISBN of ${req.params.isbn}`,});
}
return res.json({ book: getSpecificBook });}
catch(error){
    return res.json({ error: error.message});
}
    
    });

/*
Route           /c
Description     Get specific books based on category
Access          Public
Parameter       category
Methods         GET
*/
Router.get("/c/:category", async (req, res) => {
    
try{const getSpecificBook = await BookModel.findOne({ category: req.params.category});

//  const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category) );

if(!getSpecificBook){
    return res.json({error: `No book found for the category of ${req.params.category}`,});
}
return res.json({ book: getSpecificBook });
 }
catch(error){
    return res.json({ error: error.message});
}
    
    });

  /*
Route           /lang
Description     Get specific books based on language
Access          Public
Parameter       language
Methods         GET
*/
Router.get("/lang/:lng", async (req, res) => {
    
try{const getSpecificBook = await BookModel.findOne({ language: req.params.lng});
// const getSpecificBook = database.books.filter((book) => book.language === req.params.language );

if(!getSpecificBook){
    return res.json({error: `No book found for language of ${req.params.lng}`,});
}
return res.json({ book: getSpecificBook }); }
catch(error){
    return res.json({ error: error.message});
}
    
    });

           /*
Route           /book/new
Description     add new book
Access          Public
Parameter       None
Methods         POST
*/

Router.post("/new", async (req,res) => {
    try{ 
        const { newBook } = req.body;
   
        const addNewBook = await BookModel.create(newBook);
        return res.json({ message: "BOOK was added"});
    }
    catch(error){
        return res.json({ error: error.message});
    }
    
});

       /*
Route           /book/update/title/
Description     add book title
Access          Public
Parameter       isbn
Methods         PUT
*/

Router.put("/update/title/:isbn", async (req,res) => {
    try{ 
        const updatedBook = await BookModel.findOneAndUpdate(
            {
                ISBN: req.params.isbn,
            }, 
            {
                title: req.body.bookTitle,
            },{
                new: true,
            }
            );
        
        //    database.books.forEach((book) => {
        //       if(book.ISBN === req.params.isbn){
        //           book.title = req.body.newBookTitle;
        //              return;
        //         }
        //    });
           return res.json({books : updatedBook});
    }
    catch(error){
        return res.json({ error: error.message});
    }
    
    });

      /*
Route           /book/update/author/
Description     add authorId and Isbn
Access          Public
Parameter       isbn and authorId
Methods         PUT
*/
    Router.put("/update/author/:isbn", async (req,res) => {
        try{ 
     //    Update the book database
     const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        }, 
         {
             $push: 
            {author: req.body.newAuthor,}
        },
        {
            new: true,
        }
        );
    
        // database.books.forEach((book) => {
        //    if(book.ISBN === req.params.isbn){
        //        return book.author.push(parseInt(req.params.authorId));
        //      }
        // });
        
        // Update author database
        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            {
                id: req.body.newAuthor,
            }, 
             {
                 $push: 
                {books: req.params.isbn,}
            },
            {
                new: true,
            }
            );
    
        // database.author.forEach((author) =>{
        // if(author.id === parseInt(req.params.authorId)){
        //     return author.books.push(req.params.isbn);
        // }
        // });
        return res.json({books : updatedBook, author: updatedAuthor });
        }
        catch(error){
            return res.json({ error: error.message});
        }
       
         });

                /*
Route           /book/update/author/
Description     add authorId and Isbn
Access          Public
Parameter       isbn and authorId
Methods         PUT
*/

Router.put("/publication/update/book/:isbn", async (req,res) => {try{ 
     //    Update the book database
     const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        }, 
         {
            
            publication: req.body.newPub,
        },
        {
            new: true,
        }
        );

        // database.books.forEach((book) => {
        //    if(book.ISBN === req.params.isbn){
        //        book.publication = req.body.pubId;
        //        return;
        //      }
        // });
        
        // Update publication database
        const updatedPublication = await PublicationModel.findOneAndUpdate(
            {
                id: req.body.newPub,
            }, 
             {
                 $addToSet: 
                {books: req.params.isbn,}
            },
            {
                new: true,
            }
            );

        // database.publication.forEach((publication) =>{
        // if(publication.id === req.body.pubId){
        //     return publication.books.push(req.params.isbn);
        // }
        // });
        return res.json({books : updatedBook, publication: updatedPublication, message : "Successfully updated publication", });
}
catch(error){
    return res.json({ error: error.message});
}
   
   
     });

        
        /*
Route           /book/delete/
Description     delete a book
Access          Public
Parameter       isbn
Methods         DELETE
*/
    Router.delete("/delete/:isbn", async (req,res) => {
        try{ 
            const updatedBookDatabase = await BookModel.findOneAndDelete({
                ISBN: req.params.isbn,
            });
            
            // const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
           
            // database.books =  updatedBookDatabase;
    
            
            return res.json({books: updatedBookDatabase });
        }
        catch(error){
            return res.json({ error: error.message});
        }
       
    });

      /*
Route           /book/delete/author
Description     delete a author from a book
Access          Public
Parameter       isbn, author id
Methods         DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) =>{
    try{ 
     // update the book database

     const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        }, 
         {
             $pull: 
            {author: parseInt(req.body.authorId),}
        },
        {
            new: true,
        }
        );

    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         const newAuthorList = book.author.filter((author) => author !== parseInt(req.params.authorId));
    //         book.author = newAuthorList;
    //         return;
    //     }
    // });

    // database the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.body.authorId),
        }, 
         {
             $pull: 
            {books: req.params.isbn,}
        },
        {
            new: true,
        }
        );


    // database.author.forEach((author) =>{
    //     if(author.id === parseInt(req.params.authorId)){
    //         const newBooksList = author.books.filter((book) => book!== req.params.isbn);

    //         author.books = newBooksList;
    //         return;
    //     }
    // });

    return res.json({
        message: " author was deleted",
        book:     updatedBook,
        author: updatedAuthor,
    });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});

 /*
Route           /book/delete/publication
Description     delete a publication from a book
Access          Public
Parameter       isbn, pubid
Methods         DELETE
*/
Router.delete("/delete/publication/:isbn/:pubId", async(req, res) =>{
    try{ 
        const updatedBook = await BookModel.findOneAndUpdate(
            {
                ISBN: req.params.isbn,
            }, 
             {
            
                publication: 0,
            },
            {
                new: true,
            }
            );
    
    
        // // update the book database
        // database.books.forEach((book) => {
        //     if(book.ISBN === req.params.isbn){
        //         book.publication = 0;
        //         return;
        //     }
        // });
    
        // update the publication database
        const updatedPublication = await PublicationModel.findOneAndUpdate(
            {
                id: parseInt(req.body.pubId),
            }, 
             {
                 $pull: 
                {books: req.params.isbn,}
            },
            {
                new: true,
            }
            );
    
        // database.publication.forEach((publication) =>{
        //     if(publication.id === parseInt(req.params.pubId)){
        //         const newBooksList = publication.books.filter((book) => book!== req.params.isbn);
    
        //         publication.books = newBooksList;
        //         return;
        //     }
        // });
    
        return res.json({
            message: " publication was deleted",
            books: updatedBook,
            publication: updatedPublication,
        });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});


module.exports = Router;