import express from "express";
import {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    getAuthorBio,
    updateAuthorBio,
    findByName,
} from "../controllers/author.js";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", createAuthor);

router.get("/bio/:id", getAuthorBio);
router.put("/bio/:id", updateAuthorBio);
router.get("/search/by-name", findByName);

router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
