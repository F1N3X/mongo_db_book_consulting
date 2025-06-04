import Author from "../models/Author.js";
import dotenv from "dotenv";

dotenv.config();

const authors = [
  {
    name: "J.K.",
    surname: "Rowling",
    bio: "J.K. Rowling is a British author best known for her Harry Potter series.",
  },
  {
    name: "Susanne",
    surname: "Hansch",
    bio: "Susanne Hansch is a German author best known for her children's books.",
  },
  {
    name: "Elke",
    surname: "Hansch",
    bio: "Elke Hansch is a German author best known for her children's books.",
  },
];

const seedAuthors = async () => {
    await Author.deleteMany({});
    console.log("Old authors deleted");
    await Author.insertMany(authors);
    console.log("Seed authors inserted");
};

export default seedAuthors;
