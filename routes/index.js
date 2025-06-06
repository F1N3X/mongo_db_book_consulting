import express from 'express'
import Book from './book.js';
import Author from './author.js';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/books', Book);
router.use('/authors', Author);
export default router;
