import jwt from 'jsonwebtoken'
class JwtService{
    createToken = (user)=>{
         const payload = {
            userId: user.Id,
            email: user.email,
        }
        const token = jwt.sign(payload,process.env.JWT_KEY, { expiresIn:  86400}) // process.env.JWT_EXP || 60 * 60
        console.log(token)
        return token
    }
}
const jwtService = new JwtService()
export default jwtService
