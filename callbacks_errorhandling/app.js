const express = require('express');
const bodyParse = require('body-parser');
const authenticate = require('./authenticate');
const app = express();

app.use(bodyParse.json());

/**
 * Example one
 */
app.get('/example/one', (req, res, next) => {
       console.log('The response will be sent by the next function!!')
       next()
}, (req, res) => {
       console.log('Hello from B!');
       res.send('Hello from B!')
})

/**
 * Example two
 */
var one = (req, res, next) => {
       console.log('One')
       next()
}

var two = (req, res, next) => {
       console.log('Two')
       next()
}

var three = (req, res) => {
       console.log('Three')
       res.send('Hello from Three!')
}

app.get('/example/two', [one, two, three])

/**
 * Example three
 */
var oneA = (req, res, next) => {
       console.log('oneA')
       next()
}

var twoB = (req, res, next) => {
       console.log('twoB')
       next()
}

app.get('/example/three', [oneA, twoB], (req, res, next) => {
       console.log('the response will be sent by the next function ...')
       next()
}, (req, res) => {
       console.log('Hello from Guy!')
       res.send('Hello from Guy!')
})

/**
 * Example four
 */
app.post('/example/four', authenticate.verifyAdmin, (req, res) => {
       console.log('You are admin!');
       res.send('You are admin');
});

app.listen(3333, () => {
       console.log('Server is connecting on port 3333!')
})