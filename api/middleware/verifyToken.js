const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;


export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({error: 'Authentication failed'});
    } 
    console.log(authHeader); // Bearer token

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        secret,
        (err, decoded) => {
            // if (err) return res.sendStatus(403); //invalid token

            if (err) {
                res.status(403).json({error: 'Invalid token'}); 
            }             
            req.user = decoded.username;
            next();
        }
    );
}
