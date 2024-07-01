const jwt = require('jsonwebtoken');
const signature = '@$%^&&&RDFGHG!@#$%$^%^&&&%%^%^Rhfdjfh^&%&%#$^*78&%&GFbg';

module.exports = {
    VerifyToken: (req, res, next) => {
        let token = req.headers['authorization'];
        if (token) {
            token = token.split('Bearer ')[1];
            jwt.verify(token, signature, (err, decode) => {
                if (err) {
                    next('Unauthorized'); // Pass 'Unauthorized' as the error to indicate an invalid token
                } else {
                    next(); // Continue to the next middleware if the token is valid
                }
            });
        } else {
            next('Unauthorized');
        }
    }
};
