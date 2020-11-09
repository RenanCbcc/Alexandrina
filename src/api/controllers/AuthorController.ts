import { validationResult } from 'express-validator/check';
import { Request, Response } from 'express'
import AuthorDao from '../infra/AuthorDao';
import db from '../../config/database';



export default class BookController {

    browse() {
        return (request: Request, response: Response) => {
            const dao = new AuthorDao(db);
            dao.list()
                .then(entities => response.json(entities))
                .catch(error => {
                    console.log(error);
                    response.status(500).send('Error!');
                });
        }
    }

    read() {
        return (request: Request, response: Response) => {
            const id = request.params.id;
            const dao = new AuthorDao(db);
            dao.search(parseInt(id))
                .then(entity => response.json(entity))
                .catch(error => {
                    console.log(error);
                    response.status(500).send('Error!');
                });
        }
    }

    edit() {
        return (request: Request, response: Response) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }

            const dao = new AuthorDao(db);
            dao.update(request.body)
                .then(() => response.status(200).send('Success!'))
                .catch(error => {
                    console.log(error);
                    response.status(500).send('Error!');
                });
        }
    }

    add() {
        return (request: Request, response: Response) => {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }
            const dao = new AuthorDao(db);
            dao.add(request.body)
                .then(() => response.status(201).send('Created!'))
                .catch(error => {
                    console.log(error);
                    response.status(500).send('Error!');
                });
        }
    }

    delete() {
        return (request: Request, response: Response) => {
            return response.status(200).send('Not implemented yet!')            
        }
    }
}
