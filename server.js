// const express = require('express');
// // var cors = require('cors');
// // import the routes
// const routes = require('./routes/categories');
// const routes2 = require('./routes/products');
// //import the classes
// const product = require('./classes/product');
// const category = require('./classes/category');


// const app = express();
// app.use(express.json());
// //middlware
// // const urlTimeMiddlware = (req, res, next) => {
// //     let d = new Date();
// //     console.log(`קריאה למערכת התבצעה ב: ${d.toString()}, והכתובת אליה קראו היא: ${req.url} `);
// //     next();
// // }

// // const erorMiddlware = (req, res, next) => {
// //     if ((req.method === 'POST' || req.method === 'PUT') && (req.body == null && req.params === null)) {
// //         console.log(`somthing is missing in your request, in your request only ${req.body}`);
// //         res.status(500).send('somthing is missing in your request');
// //     }
// //     else next();
// // }

// //lesson11
// // Import Routes
// const authRoute = require('./routes/auth');
// // const auth= require('./middleware/auth.middleware.js')
// // Route Middlewares
// app.use('/users', authRoute);

// // app.use(cors());
// // app.use(urlTimeMiddlware);
// // app.use(erorMiddlware);
// //middleware to chck token?
// // app.use(auth.loggedIn);
// app.use(routes); //to use the routes
// app.use(routes2);


// const listener = app.listen(process.env.PORT || 3000, () => {
//     console.log('Your app is listening on port ' + listener.address().port)
// });
const express = require('express');
const { MongoClient } = require('mongodb');
const routes = require('./routes/categories');
const routes2 = require('./routes/products');

const app = express();
app.use(express.json());

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017'; // Update this URI with your MongoDB connection string
const dbName = 'your_database_name'; // Update this with your database name

// Connect to MongoDB
// Connect to MongoDB
MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db(dbName);

        // Use the database connection in your routes or middleware as needed
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Import the routes
        app.use(routes);
        app.use(routes2);

        const listener = app.listen(process.env.PORT || 3000, () => {
            console.log('Your app is listening on port ' + listener.address().port);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });
