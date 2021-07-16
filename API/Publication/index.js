const Router = require("express").Router();

const PublicationModel = require("../../database/publication");

/*
Route           /publications
Description     Get all publications
Access          Public
Parameter       None
Methods         GET
*/

Router.get("/", async (req,res) => {
    try{ 
        const getAllPublications = await PublicationModel.find();
        return res.json({publication: getAllPublications });
    
        // return res.json({publications: database.publication });
    }
    catch(error){
        return res.json({ error: error.message});
    }
    
});


        
// Route           /publictions/book/:publications
// Description     Get specific books based on publications
// Access          Public
// Parameter       publications
// Methods         GET

Router.get("/book/:publications", async (req, res) => {
    try{ 
        const getSpecificPublication = await PublicationModel.findOne({ id : req.params.publications});

        //  const getSpecificPublication = database.publication.filter((publications) =>publications.id === parseInt(req.params.publications));
        
        if(!getSpecificPublication){
            return res.json({error: `No book found for the author Id of ${req.params.publications}`,});
        }
        return res.json({ publications: getSpecificPublication });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
    
    });

            /*
Route           /publication/book/
Description     Get specific publications based on isbn
Access          Public
Parameter       isbn
Methods         GET
*/
Router.get("/book/:isbn", async (req, res) => {
    try{ 
        const getSpecificPublication = await PublicationModel.findOne({ books : req.params.isbn});


        // const getSpecificPublication = database.publication.filter((publications) => public.books.includes(req.params.isbn));
        
        if(!getSpecificPublication){
            return res.json({error: `No book found for the author Id of ${req.params.isbn}`,});
        }
        return res.json({publication: getSpecificPublication });
        
    }
    catch(error){
        return res.json({ error: error.message});
    }
    
    });

   
 
         /*
Route           /publication/new
Description     add new publication
Access          Public
Parameter       None
Methods         POST
*/
Router.post("/new", (req,res) =>{
    try{ 
        const { newPublication } = req.body;
        PublicationModel.create(newPublication);
        return res.json({message: "Publication was added" });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});



 
    /*
Route           /update/publication/name/
Description     Update publication name
Access          Public
Parameter       pubId
Methods         PUT
*/
Router.put("/update/name/:pubId", async (req,res) => {
    try{ 
        const updatedPublication = await PublicationModel.findOneAndUpdate(
            {
                id: req.params.pubId,
            }, 
             {
             
                name: req.body.newpub,
            },
            {
                new: true,
            }
            );
    
        // database.publication.forEach((publication) => {
        //     if(publication.id === parseInt(req.params.pubId)){
        //         publication.name = req.body.newPubName;
        //            return;
        //       }
        //  });
         return res.json({publication : updatedPublication});
    }
    catch(error){
        return res.json({ error: error.message});
    }
    
});

      /*
Route           /publication/delete/
Description     delete a publication
Access          Public
Parameter       pubid
Methods         DELETE
*/
Router.delete("/publication/delete/:pubId", async (req,res) => {
    try{ 
        const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
            id: req.params.pubId,
        });
       
    
        // const updatedBookDatabase = database.publication.filter((publication) => publication.id !== parseInt(req.params.pubId));
       
        // database.publication =  updatedBookDatabase;
        return res.json({publication: updatedPublicationDatabase });
    }
    catch(error){
        return res.json({ error: error.message});
    }
   
});

module.exports = Router;

