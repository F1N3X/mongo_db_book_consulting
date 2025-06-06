import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        validate: {
            validator: async function(v) {
                return await mongoose.model('Author').findById(v);
            },
            message: 'Author not found'
        }
    }],
    pageNumber: {
        type: Number,
        required: true,
    },
    summary: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        min: 0
    },
    publishedDate: {
        type: Date,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    edition: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    }
})

BookSchema.index(
    { title: "text", summary: "text" }, 
    { weights: { title: 1, summary: 3 } }
);

BookSchema.methods.addAuthor = async function(authorId) {
    if (this.authors.length >= 1) {
        throw new Error('Author already exists');
    }
    this.authors.push(authorId);
    return this.save();
};

BookSchema.methods.removeAuthor = async function(authorId) {
    const index = this.authors.indexOf(authorId);
    if (index === -1) {
        throw new Error('Author not found');
    }
    this.authors.splice(index, 1);
    return this.save();
};

const Book = mongoose.model('Book', BookSchema);

export default Book;