import { validationResult } from 'express-validator/check';
import { Request, Response } from 'express'
import Book from '../models/Book'


export default class BookController {

    browse() {
        return async (request: Request, response: Response) => {
            await Book
                .find({})
                .then(
                    (entities) => { response.status(200).send(entities) },
                    (error) => { response.status(500).send(error) }
                );
        }
    }

    read() {
        return async (request: Request, response: Response) => {
            await Book
                .find({ _id: request.params.id })
                .then(
                    (entity) => {
                        if (!entity) throw Error('Book not found.')
                        response.status(200).send(entity)
                    },
                    (error) => {
                        response.status(404).send(error)
                    }
                );
        }
    }

    edit() {
        return async (request: Request, response: Response) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }

            await Book
                .findByIdAndUpdate({ _id: request.params.id }, request.body)
                .then(
                    (book) => {
                        response.status(200).send(book)
                    },
                    (error) => {
                        response.status(404).send(error)
                    }
                );
        }
    }

    add() {
        return async (request: Request, response: Response) => {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }

            await Book
                .create(request.body)
                .then(
                    (book) => {
                        response.status(201).send(book)
                    },
                    (error) => {
                        response.status(404).send(error)
                    }
                );

        }
    }

    delete() { return () => { } }
}
