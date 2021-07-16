const Router = require("express").Router();
const AuthorModel = require("../../database/author");

/*
Route           /author
Description     Get all author
Access          Public
Parameter       None
Methods         GET
*/

Router.get("/", async (req,res) => {
    try{ 
        const getAllAuthors = await AuthorModel.find();
        return res.json({author: getAllAuthors });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});

    /*
Route           /author
Description     Get specific books based on author
Access          Public
Parameter       authorid
Methods         GET
*/
Router.get("/book/:authorId", async(req, res) => {
    try{ 
        const getSpecificbooks = await AuthorModel.findOne({ id : req.params.authorId});


        // const getSpecificbooks = await database.author.filter((authorId) => authorId.id === parseInt(req.params.authorId));
        
        if(!getSpecificbooks){
            return res.json({error: `No book found for the author Id of ${req.params.authorId}`,});
        }
        return res.json({ author: getSpecificbooks });
        
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
    });

        /*
Route           /author/book/
Description     get list of authors based on books
Access          Public
Parameter       isbn
Methods         GET
*/
Router.get("/bookin/:isbn", async (req, res) => {
    try{ 
        const getSpecificAuthor = await AuthorModel.findOne({ books : req.params.isbn});

        // const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
        
        if(!getSpecificAuthor){
            return res.json({error: `No book found for the author Id of ${req.params.isbn}`,});
        }
        return res.json({ author: getSpecificAuthor });
        
       
    }
    catch(error){
        return res.json({ error: error.message});
    }
});

            /*
Route           /author/new
Description     add new author
Access          Public
Parameter       None
Methods         POST
*/
Router.post("/new", (req,res) =>{
    try{ 
        const { newAuthor } = req.body;
        AuthorModel.create(newAuthor);
        return res.json({message: "Author was added" });
    }
    catch(error){
        return res.json({ error: error.message});
    }
});

     /*
Route           /update/author/name/
Description     Update author name
Access          Public
Parameter       authorId
Methods         PUT
*/
Router.put("/update/name/:authorId", async (req,res) => {
    try{ 
        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            {
                id: req.params.authorId,
            }, 
             {
             
                name: req.body.newAuthor,
            },
            {
                new: true,
            }
            );
    
        // database.author.forEach((author) => {
        //     if(author.id === parseInt(req.params.authorId)){
        //         author.name = req.body.newAuthorName;
        //            return;
        //       }
        //  });
         return res.json({author : updatedAuthor});
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});

    /*
Route           /author/delete/
Description     delete a author
Access          Public
Parameter       author id
Methods         DELETE
*/
Router.delete("/delete/:authorId", async (req,res) => {
    try{ 
        const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
            id: req.params.authorId,
        });
    
        // const updatedBookDatabase = database.author.filter((author) => author.id !== parseInt(req.params.authorId));
       
        // database.author =  updatedBookDatabase;
        return res.json({author: updatedAuthorDatabase });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});

module.exports = Router;


