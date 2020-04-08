exports.basicAuth = (req, res, next) => {
       console.log(req.headers);
       console.log(req.signedCookies);
       console.log(req.session);

       if (!req.session.admin) {
              var err = new Error('You are not authenticated!');
              err.status = 403;
              return next(err);
       }
       else {
              if (req.session.admin === 'authenticated') {
                     next();
              }
              else {
                     var err = new Error('You are not authenticated!');
                     err.status = 403;
                     return next(err);
              }
       }
}