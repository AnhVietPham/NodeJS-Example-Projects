exports.verifyAdmin = (req, res, next) => {
       if (req.body.admin === 'admin') {
              next();
       } else {
              var err = new Error('You are not authorized to perform this operation!');
              err.statusCode = 403;
              next(err);
       }
}