module.exports = app => {
    const controller =  require('../controllers/controller')
    app.post('/users/signin', controller.authenticate)
    app.get('/users/getAll', controller.getAll)
}