import express from "express";
import {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks,
} from "../controllers/book.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);

router.get("/search", searchBooks);

router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
