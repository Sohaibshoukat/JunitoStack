const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY;

const fetchuser = async (req, res, next) => {
    const Token = req.header('auth-token')

    if (!Token) {
        res.status(401).send({ error: "Please thenticate token" })
    }
    try {
        const data = await jwt.verify(Token, JWT_KEY)
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Please authenticate token" })
    }
}

module.exports = fetchuser;