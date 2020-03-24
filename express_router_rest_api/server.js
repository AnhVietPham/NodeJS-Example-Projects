const express = require('express');
const app = express();
const dishRouter = require('./routes/dishRouter')

app.use('/dishes', dishRouter);

app.listen(9999, () => {
    console.log('Server is connecting on port 9999!')
})