let books = [
    {
        ISBN: "12345One", 
        title: "Getting started with MERN",
        pubDate: "2021-07-7",
        numOfPage: 225,
        language: "en",
        author: [1, 2],
        publication: 1,
        category: ["Education", "UI", "webdev", "Thriller"]
    },

    {
        ISBN: "12345Two", 
        title: "Getting started with Python",
        pubDate: "2021-07-7",
        numOfPage: 225,
        language: "en",
        author: [1, 2],
        publication: 1,
        category: ["tech", "fiction", "webdev", "Thriller"]
    },
];


const author = [{
    id: 1,
    name: "Pavan",
    books : ["12345One", "12345Two"],
   },
   {
     id: 2, name : "Elon Musk", books: ["12345Book"],
   },
];

const publication = [{
    id: 1,
    name: "Writex",
    books: ["12345One"],

},
{
    id: 2,
    name: "Vickie publications",
    books: [],

}
];

module.exports ={ books, author, publication};