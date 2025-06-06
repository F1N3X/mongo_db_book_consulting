import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
    const shouldPopulate = req.query.populate === 'true';
    let query = Book.find();
    if (shouldPopulate) {
        query = query.populate('authors', 'name surname');
    }
    const books = await query
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
        .populate('authors', 'name surname');
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
        const books = await Book.find(
            { $text: { $search: q, $language: "fr" } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } })

        res.status(200).json(books);
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
