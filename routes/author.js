import express from "express";
import {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor
} from "../controllers/author.js";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", createAuthor);

router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
