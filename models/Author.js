import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 1000
    },
})

AuthorSchema.index(
    { name: "text", surname: "text", bio: "text" },
    { weights: { name: 5, surname: 3, bio: 1 } }
);

const Author = mongoose.model('Author', AuthorSchema);

export default Author;
