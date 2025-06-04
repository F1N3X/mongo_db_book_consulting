import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
    const books = await Book.find();
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
    const book = await Book.findById(req.params.id);
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

export const findByName = async (req, res) => {
    const books = await Book.find({ title: { $regex: req.query.title, $options: "i" } });
    res.status(200).json(books);
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
