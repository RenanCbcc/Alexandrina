import express from 'express';
import AuthorController from '../controllers/AuthorController'
import { check } from 'express-validator';

export default function booksRoutes(app: express.Application) {
    let validations = [
        check('name').isLength({ min: 5 }).withMessage('O nome do autor precisa ter no mínimo 5 caracteres!'),
    ]
    let controller = new AuthorController();

    app.route('/author')
        .post(validations, controller.add())
        .get(controller.browse());

    app.route('/author/:id')
        .put(validations, controller.edit())
        .get(controller.read())
        .delete(controller.delete());


}