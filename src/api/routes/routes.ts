import express from 'express';
import booksRoutes from './books-routes';
import authorsRoutes from './authors-routes';

export default (app: express.Application) => {
    booksRoutes(app);
    authorsRoutes(app);
}