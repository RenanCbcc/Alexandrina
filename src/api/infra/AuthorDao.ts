import Author from "../models/Author";

export default class AuthorDao {

    constructor(private readonly _db: any) { }

    list(): Promise<Author[]> {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM authors',
                (error: Error, result: Author[]) => {
                    if (error) return reject('It was not possible to list all authors!');

                    return resolve(result);
                }
            )
        });
    }

    search(id: number) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM authors
                    WHERE id = ?
                `,
                [id],
                (error: Error, author: Author) => {
                    if (error) {
                        return reject('It aws not possible to find the author!');
                    }
                    return resolve(author);
                }
            );
        });
    }

    add(author: Author) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO authors (
                    name                    
                ) values (?)
                `,
                [
                    author.name
                ],
                function (error: Error) {
                    if (error) {
                        console.log(error);
                        return reject('It was not possible to add a new author!');
                    }

                    resolve();
                }
            )
        });
    }

    update(author: Author) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE authors SET
                name = ?
            `,
                [
                    author.name
                ],
                (error: Error) => {
                    if (error) {
                        return reject('It was not possible to upadate the author!');
                    }

                    resolve();
                });
        });
    }

    remove(id: number) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM authors
                    WHERE id = ?
                `,
                [id],
                (error: Error) => {
                    if (error) {
                        return reject('It was not possible to remove the author!');
                    }
                    return resolve();
                }
            );
        });
    }
}