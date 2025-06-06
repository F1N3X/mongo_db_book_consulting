import Book from "../models/Book.js";
import Author from "../models/Author.js";
const QueryManager = (query, req) =>{
    const shouldPopulate = req.query.populate === 'true';
    if (shouldPopulate) {
        query = query.populate('authors', 'name surname');
    }
    return query;
}

export const getBooks = async (req, res) => {
    const books = await QueryManager(Book.find(), req)
    res.status(200).json(books);
};

export const createBook = async (req, res) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
};

export const updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
};

export const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
};

export const getBookSummary = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book.summary);
};

export const updateBookSummary = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, { summary: req.body.summary }, { new: true });
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book.summary);
};

export const searchBooks = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: "Search query is required" });
    }
    try {
        const books = await QueryManager(Book.find(
            { $text: { $search: q, $language: "fr" } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }), req);

        const authors = await Author.find(
            { $text: { $search: q, $language: "fr" } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        let booksByAuthor = [];
        if (authors.length > 0) {
            const authorIds = authors.map(a => a._id);
            booksByAuthor = await QueryManager(
                Book.find({ authors: { $in: authorIds } }),
                req
            );
        }

        const allBooksMap = new Map();
        books.forEach(book => allBooksMap.set(book._id.toString(), book));
        booksByAuthor.forEach(book => allBooksMap.set(book._id.toString(), book));
        const allBooks = Array.from(allBooksMap.values());

        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookAuthor = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book.author);
};

export const updateBookAuthor = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, { author: req.body.author }, { new: true });
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book.author);
};

export const deleteBookAuthor = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, { author: null }, { new: true });
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book author deleted successfully" });
};
