// Import
const jwt = require('jsonwebtoken');
require('dotenv').config

//Exported functions
module.exports = {
    generateTokenForUser: userData => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        process.env.JWT_SIGN_SECRET || "BonjourJeSuisUnTest",
        {
            expiresIn: '12h'
        })
    }, 

    parseAuthorization: authorization => {
        return (authorization != null) ? authorization.replace('Bearer ','') : null;
    },

    getUserId: authorization => {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, process.env.JWT_SIGN_SECRET || "BonjourJeSuisUnTest");
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) {}
        }
        return userId;
    },

    UserIsAdmin: authorization => {
        var userIsAdmin = false;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, process.env.JWT_SIGN_SECRET || "BonjourJeSuisUnTest");
                if (jwtToken != null)
                userIsAdmin = jwtToken.isAdmin;
            } catch (err) {}
        }
        return userIsAdmin;
    }
};