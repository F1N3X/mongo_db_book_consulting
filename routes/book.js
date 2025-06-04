import express from "express";
import {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    getBookSummary,
    updateBookSummary,
    findByName,
    getBookAuthor,
    updateBookAuthor,
    deleteBookAuthor
} from "../controllers/book.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);

router.get("/summary/:id", getBookSummary);
router.put("/summary/:id", updateBookSummary);
router.get("/search/by-name", findByName);

router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

router.get("/:id/author", getBookAuthor);
router.put("/:id/author", updateBookAuthor);
router.delete("/:id/author", deleteBookAuthor);

export default router;
