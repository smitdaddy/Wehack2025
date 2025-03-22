const { validateUser } = require("../services/authentication");

function checkforAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
           return next();
        }
        try {
            const userPayload = validateUser(tokenCookieValue);
            req.user = userPayload;   
        } catch (error) {}
         return next();
    }

}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            console.log("No user found, redirecting to login");
            return res.redirect("/login");
        }

        console.log("User:", req.user);
        console.log("Allowed Roles:", roles);

        if (!roles.includes(req.user.role)) {
            console.log("User role not authorized:", req.user.role);
            return res.status(403).send("Unauthorized");
        }

        console.log("User is authorized, proceeding...");
        next();
    };
}


module.exports = {
   checkforAuthenticationCookie,
   restrictTo,
}
