/*
* express (npm i express)
* mongoose (npm i mongoose)
* nodemon (sudo npm i nodemon -g)
* dotenv (npm i dotenv) -> sendgrid
* body-parser (npm i body-parser)
* bcrypt (npm i bcrypt)
* json web token (npm i jsonwebtoken)
*/


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors())

// -----------------------------------
const userRoute = require('./routes/UserRoutes');
const customerRoute = require('./routes/CustomerRoute');
const orderRoute = require('./routes/OrderRoute');
const productRoute = require('./routes/ProductRoute');
// -----------------------------------


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

try {
    mongoose.connect('mongodb://127.0.0.1:27017/posAPI');

    app.listen(port, () => {
        console.log(`server started & running on port ${port}`);
    });

} catch (e) {
    console.log(e);
}

app.get('/test-api', (req, res) => {
    return res.json({'message': 'Server Started!'});
});

// --------------
app.use('/api/v1/users', userRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/customers', customerRoute);

