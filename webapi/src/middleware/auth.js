import jwt from 'jsonwebtoken'
import Users from '../models/user.js'

const authenticate = (req, res, next) => {
    if(!req.headers['authorization']){
        return res.status(401).json({ message: 'No authorization header provided' })
    }
    const token = req.headers['authorization'].replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = Users.findById(decoded.userId)
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token - user not found' })
        }
        next() // Proceed to the next middleware or route handler
    }
    catch (err) {
        console.error(err)
        return res.status(401).json({ message: 'Invalid token', error: err })
    }
}

const authorize = (req, res, next) => {
    if(!req.headers['authorization']){
        return res.status(401).json({ message: 'No authorization header provided' })
    }
    const token = req.headers['authorization'].replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    try{
         const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = Users.findById(decoded.userId)
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token - user not found' })
        }
        if(req.user.role !== 'admin'){
            return res.status(403).json({ message: 'Forbidden - insufficient permissions' })
        }
        next()
    }
    catch(err){
        console.error(err)
        return res.status(403).json({ message: 'Forbidden - insufficient permissions' })

    }
}
export default { authenticate, authorize }