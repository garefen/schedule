require('dotenv');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(`mongodb+srv://admin:admin@cluster0-ufmxa.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(routes);


app.listen(3333);
