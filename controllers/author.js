import Author from "../models/Author.js";

export const getAuthors = async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
};

export const createAuthor = async (req, res) => {
    const newAuthor = new Author(req.body);
    try {
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAuthorById = async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
};

export const updateAuthor = async (req, res) => {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
};

export const deleteAuthor = async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
};
