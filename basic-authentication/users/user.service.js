const users = [{ id: 1, username: 'dennispham8745', password: '123456789', firstName: 'Anh Viet', lastName: 'Pham' }];


module.exports = {
    authenticate
}

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user){
        const {password, ...userwithoutPassword} = user;
        let token = username + ':' + password;
        var data = {
            data: userwithoutPassword,
            token: Buffer.from(token).toString('base64')
        };
        return data;
    }
}

// async function getAll() {
//     return users.map(u => {
//         const {password, ...userwithoutPassword} = user;
//         return userwithoutPassword 
//     })
// }