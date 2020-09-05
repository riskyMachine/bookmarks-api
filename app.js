const mongoose = require('mongoose');
const express = require('express');
const app = express();
const ApiRoutes = require('./routes');
const path = require('path');

app.use(express.json());
app.use('/', ApiRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/bookmarksDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connectin error:'))
db.once('open', (req, res) => {
    console.log('Connected to server')
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})