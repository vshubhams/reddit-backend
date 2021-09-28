const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const connect = () => {
    return mongoose.connect(uri)
}
module.exports = connect;