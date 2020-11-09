const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('alexandrina.db');

const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(40) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    url_photo TEXT
)
`;

const AUTHOR_SCHEMA = `
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(40) NOT NULL,
    url_photo TEXT 
)
`;

const BOOKS_SCHEMA =
    `
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    authorid INTEGER NOT NULL,
    title TEXT NOT NULL,    
    description TEXT DEFAULT ('') NOT NULL,
    code VARCHAR(13) NOT NULL UNIQUE,
    available BOOLEAN DEFAULT (1) NOT NULL,
    url_cover TEXT
)
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USERS_SCHEMA);
    db.run(AUTHOR_SCHEMA);
    db.run(BOOKS_SCHEMA);
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('DB shot down!');
        process.exit(0);
    })
);

export default db;