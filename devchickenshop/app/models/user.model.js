const mysql = require('./db')
const User = function (user) {
       this.firstName = user.firstName;
       this.lastName = user.lastName;
       this.gender = user.gender;
       this.phoneNumber = user.phoneNumber;
       this.email = user.email;
};

User.create = (newUser, result) => {
       sql.query("INSERT INTO user SET ?", newCustomer, (err, res) => {
              if (err) {
                     console.log("error: ", err);
                     result(err, null);
                     return;
              }

              console.log("created customer: ", { id: res.insertId, ...newCustomer });
              result(null, { id: res.insertId, ...newCustomer });
       });
};