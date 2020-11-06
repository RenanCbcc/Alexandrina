import express from 'express';
import BookController from '../controllers/BookController'
import { check } from 'express-validator/check';

export default function booksRoutes(app: express.Application) {
  let validations = [
    check('title').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
    check('price').isCurrency().withMessage('O preço precisa ter um valor monetário válido!'),
    check('code').isLength({min:17,max:13}).withMessage('O código precisa ter exatamente 13 caracteres!')
  ]
  let controller = new BookController();

  app.route('/book')
    .post(controller.add())
    .get(controller.browse());

  app.route('/book/:id')
    .put(validations, controller.edit())
    .get(controller.read());



}