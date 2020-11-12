import { validationResult } from 'express-validator/check';
import { Request, Response } from 'express'
import Author from '../models/Author'


export default class AuthorController {

    browse() {
        return async (request: Request, response: Response) => {
            await Author
                .find({})
                .then(
                    (entities) => { response.status(200).send(entities) },
                    (error) => { response.status(500).send(error) }
                );
        }
    }

    read() {
        return async (request: Request, response: Response) => {
            await Author
                .find({ "_id": request.params.id })
                .then(
                    (entity) => {
                        if (!entity) throw Error('Author not found.')
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

            await Author
                .findByIdAndUpdate({ _id: request.params.id }, request.body)
                .then(
                    (Author) => {
                        response.status(200).send(Author)
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

            await Author
                .create(request.body)
                .then(
                    (Author) => {
                        response.status(201).send(Author)
                    },
                    (error) => {
                        response.status(404).send(error)
                    }
                );

        }
    }

    delete() {
        return (request: Request, response: Response) => {
            return response.status(200).send('Not implemented yet!')
        }
    }
}
