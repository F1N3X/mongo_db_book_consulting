import Book from "../models/Book.js";
import Author from "../models/Author.js";

const books = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        authors: [
            "J.K. Rowling",
        ],
        pageNumber: 308,
        summary: "Harry Potter is a young wizard who discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
        // price: ,
        // publishedDate: "2001-06-26",
        category: "Roman",
        type: "Fantasy",
        edition: "Folio Junior",
        isbn: "2-07-042305-9",
        language: "French",
    },
    {
        title: "L'Homme",
        // authors: [
        //     "J.K. Rowling",
        // ],
        pageNumber: 156,
        // summary: "L'Homme is a book about a man who is a good person.",
        price: 25.00,
        publishedDate: "1997-09-01",
        category: "Magasine",
        type: "Scince",
        edition: "Science et vie",
        isbn: "0151 0282",
        language: "French",
    },
    {
        title: "Manger ses mauvaises herbes",
        authors: [
            "Susanne Hansch",
            "Elke Hansch",
        ],
        pageNumber: 128,
        summary: "Manger ses mauvaises herbes is a book about a man who is a good person.",
        price: 16.90,
        // publishedDate: "1997-09-01",
        category: "Culinaire",
        type: "Cuisine",
        edition: "Ulmer",
        isbn: "978-2-300-00000-0",
        language: "French",
    }
];

const seedBooks = async () => {
    await Book.deleteMany({});
    console.log("Old books deleted");

    const allAuthors = await Author.find({}, "name");
    const getRandomAuthors = (size = 1) => {
        const authors = [];
        while (authors.length < size && authors.length < allAuthors.length) {
            const randomIndex = Math.floor(Math.random() * allAuthors.length);
            authors.push(allAuthors[randomIndex]._id);
        }
        return authors;
    };
    const booksWithAuthors = books.map(book => ({
        ...book,
        authors: getRandomAuthors(),
    }));

    await Book.insertMany(booksWithAuthors);
    console.log("Seed books inserted");
};

export default seedBooks;