import mongoose from 'mongoose'

export default (url: string) => {
    mongoose.connect('mongodb://' + url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;

    db.on('error', function (error) {
        console.log('connection error: ' + error)
    });

    db.on('connected', function () {
        console.log("💾 Connected to the database.");
    });

    db.on('disconnected', function () {
        console.log("💾 Disconnected to the database.");
    });    

    return db;
}

