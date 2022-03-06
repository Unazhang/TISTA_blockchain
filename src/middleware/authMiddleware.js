// const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.sessionStorage.jwtToken;
  console.log("token is ", token);
  if (token) {
    // jwt.verify(token, "secret", (err, decodedToken) => {
    //   if (err) {
    //     console.log(err.message);
    //     res.redirect("/login");
    //   } else {
    //     console.log(decodedToken);
    //     next();
    //   }
    // });
    next();
  } else {
    console.log("not logged in. redirect to login page");
    res.redirect("/login");
  }
};
module.exports = { requireAuth };
