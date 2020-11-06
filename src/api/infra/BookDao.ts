import Book from "../models/Book";

export default class BookDao {

    constructor(private readonly _db: any) { }

    list(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM books',
                (error: Error, result: Book[]) => {
                    if (error) return reject('It was not possible to list all books!');

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
                    FROM books
                    WHERE id = ?
                `,
                [id],
                (error: Error, book: Book) => {
                    if (error) {
                        return reject('It aws not possible to find the book!');
                    }
                    return resolve(book);
                }
            );
        });
    }

    add(book: Book) { 
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO books (
                    title, 
                    authorid,
                    description,
                    code                    
                ) values (?,?,?,?)
                `,
                [
                    book.title,
                    book.authorid,
                    book.description,
                    book.code
                ],
                function (error:Error) {
                    if (error) {
                        console.log(error);
                        return reject('It was not possible to add a new book!');
                    }

                    resolve();
                }
            )
        });
    }

    update(book: Book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                title = ?,                
                description = ?,
                available = ?,
                WHERE id = ?
            `,
                [
                    book.title,                    
                    book.description,
                    book.available
                ],
                (error: Error) => {
                    if (error) {
                        return reject('It was not possible to upadate the book!');
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
                    FROM books
                    WHERE id = ?
                `,
                [id],
                (error: Error) => {
                    if (error) {
                        return reject('It was not possible to remove the book!');
                    }
                    return resolve();
                }
            );
        });
    }
}