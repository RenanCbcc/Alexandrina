import { validationResult } from 'express-validator/check';
import { Request, Response } from 'express'
import BookDao from '../infra/BookDao';
import db from '../../config/database';



export default class BookController {

    browse() {
        return (request: Request, response: Response) => {
            const dao = new BookDao(db);
            dao.list()
                .then(books => response.json(books))
                .catch(error => console.log(error));

        }
    }

    read() {
        return (request: Request, response: Response) => {
            const id = request.params.id;
            const dao = new BookDao(db);
            dao.search(parseInt(id))
                .then(book => response.json(book))
                .catch(error => console.log(error));
        }
    }

    edit() {
        return (request: Request, response: Response) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }

            const dao = new BookDao(db);
            dao.update(request.body)
                .then(() => response.status(200).send())
                .catch(erro => console.log(erro));
        }
    }

    add() {
        return (request: Request, response: Response) => {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }
            const dao = new BookDao(db);
            dao.add(request.body)
                .then(() => response.status(201).send())
                .catch(erro => console.log(erro));
        }
    }

    delete() { return () => { } }
}
