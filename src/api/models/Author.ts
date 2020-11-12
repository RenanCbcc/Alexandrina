import mongoose from 'mongoose'

interface IAuthorDocument extends mongoose.Document {
    title: string;
    description: string
}

interface IAuthor {
    name: string;
    url_photo: string;
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url_photo: {
        type: String
    }

})

interface IAuthorModel extends mongoose.Model<IAuthorDocument> {
    build(attr: IAuthor): IAuthorDocument;
}

schema.statics.build = (attr: IAuthor) => {
    return new Author(attr);
}

const Author = mongoose.model<IAuthorDocument, IAuthorModel>('Author', schema);


export default Author
