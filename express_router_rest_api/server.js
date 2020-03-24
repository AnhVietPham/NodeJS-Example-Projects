const express = require('express');
const app = express();
const dishRouter = require('./routes/dishRouter')

// app.all('/dishes', (req, res, next) => {
//     res.statusCode = 400;
//     res.setHeader('Content-Type','text/plain');
//     next();
// });

// app.get('/dishes', (req, res, next) => {
//     res.end("We will send all users to You!!")
// });

// app.post('/dishes', (req, res, next) => {
//     res.end(`Hey Guy! We will give you to know more about information of Dish. Name Dish : ${req.body.nameDish} and Description : ${req.body.descriptionDish}`)
// });

// app.put('/dishes', (req, res, next) => {
//     res.statusCode = 300;
//     res.end('PUT operation does not support on /dishes');
// });

// app.delete('/dishes', (req, res, next) => {
//     res.end('Delete all Dishes!!!')
// });

// app.get('/dishes/:dishId', (req, res, next) => {
//     res.end(`Hey guy! Now we will send detail of is dish: ${req.params.dishId} to you!!`)
// });

// app.post('/dishes/:dishId', (req, res, next) => {
//     res.statusCode = 403;
//     res.end(`POST operator does not support on dishes/ : ${req.params.dishId}`);
// })

// app.put('/dishes/:dishId', (req, res, next) => {
//     res.write(`Updating with dish: ${req.params.dishId} `);
//     res.end(`We are updating your dish with dishId = ${req.params.dishId} and Content is updated nameDish : ${req.body.nameDish} and description : ${req.body.descriptionDish}`);
// });

// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end(`We are deleting your dish : ${req.params.dishId}`);
// })

app.use('/dishes', dishRouter);

app.listen(9999, () => {
    console.log('Server is connecting on port 9999!')
})