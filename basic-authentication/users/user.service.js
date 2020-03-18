const users = [{ id: 1, username: 'dennispham8745', password: '123456789', firstName: 'Anh Viet', lastName: 'Pham' }];

module.exports = {
    authenticate, getAll
}

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user){
        const {password, ...userwithoutPassword} = user;
        return userwithoutPassword;
    }
}

async function getAll() {
    return users.map(u => {
        const {password, ...userwithoutPassword} = user;
        return userwithoutPassword 
    })
}