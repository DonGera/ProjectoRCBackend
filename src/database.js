const mongoose = require ('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

    module.exports = mongoose;