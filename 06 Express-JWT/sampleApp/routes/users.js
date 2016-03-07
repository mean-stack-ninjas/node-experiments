var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


var tokenConfig = {
	secret: 'abc',
	expiresIn: 200000
};
	
router.post('/login', function (req, res) {
    // db check
    
        var user = {
            id: 1,
            firstName: 'Saied'
        };
        
        // create a token
        var token = jwt.sign(user, tokenConfig.secret, {
            expiresIn: tokenConfig.expiresIn
        });

        user.token = token;
        
        return res
                .status(200)
                .json({
        data: user
    });
});

// middleware to use for all required authentication requests
router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, tokenConfig.secret, function (err, decoded) {
            if (err) {
                return res
                .status(403)
                .json({
                    code: 403,
                    msg: 'not valid token',
                    data: null
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.userInfo = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res
                .status(403)
                .json({
            code: 403,
            msg: 'not authenticated',
            data: null
        });
    }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('get users .....')
  res.send('respond with a resource');
});



module.exports = router;
