import mongoose from 'mongoose'

interface IBookDocument extends mongoose.Document {
    title: string;
    description: string
}

interface IBook {
    authorid: string;
    title: string;
    description: string;
    code: string;
    pages: number;
    available: boolean;
    url_cover: string
}
const schema = new mongoose.Schema({
    authorid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
    url_cover: {
        type: String
    }

})

interface IBookModel extends mongoose.Model<IBookDocument> {
    build(attr: IBook): IBookDocument;
}

schema.statics.build = (attr: IBook) => {
    return new Book(attr);
}

const Book = mongoose.model<IBookDocument, IBookModel>('Book', schema);


export default Book
