import express from "express";
import booksRoutes from '../api/routes/books-routes';

const app = express();
app.use(express.json());

booksRoutes(app);

export default app;