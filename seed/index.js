import mongoose from 'mongoose';
import seedAuthors from './author.js';
import seedBooks from './book.js';

const seed = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        await seedAuthors();
        await seedBooks();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(0);
    }
}

seed();