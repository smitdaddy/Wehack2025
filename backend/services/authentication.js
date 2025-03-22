const JWT = require("jsonwebtoken");

const secret = "$weHack@123";

function createTokenForUser(user){
    const payload={
        _id:user._id,
        name:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role : user.role,
    };
    const token = JWT.sign(payload,secret);
    return token;
}

function validateUser(token){
    const payload = JWT.verify(token,secret);
    return payload;
}


module.exports = {
    createTokenForUser,
    validateUser,
}