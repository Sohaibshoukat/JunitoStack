const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY;

const fetchadmin = (req,res,next)=>{

    const Token = req.header('AdminBizzToken')
    if(!Token)
    {
        res.status(401).send({error:"Please authenticate token 1"})
    }

    try {
        const data = jwt.verify(Token,JWT_KEY)
        req.admin=data.admin;
        
        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).send({error:"Please authenticate token"})
    }

   

}

module.exports = fetchadmin;