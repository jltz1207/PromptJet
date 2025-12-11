import Users from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import jwtService from './jwtService.js'
import User from '../models/user.js'
import commonService from './commonService.js'
import userActivityLogSchema from '../models/userActivityLog.js'

class UserService {
    getAllUsers = async () => {
        return await Users.find()
    }

    login = async (req) => {
        const user = await Users.findOne({ email: req.body.email.trim() }).select('+password')
        const userLog = {
            userId: user._id,
            activityType: 'login',
            timestamp: commonService.currentHKT(),
            metadata: {
                ipAddress: req.ip,
                device: { platform: req.headers['user-agent'] || 'Unknown'  }
            }
        }
         if (user === null) {
            Users.create(
                {...userLog, isSuccess: false, description: 'Failed login attempt due to incorrect email' }
            )
            return { result: true, message: "Incorrect email" }
        }
       
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            await userActivityLogSchema.create(
                { ...userLog, isSuccess: false, description: 'Failed login attempt due to incorrect password' }
            )
            return { success: false, message: "Incorrect password" }
        }
        const token = jwtService.createToken(user)
        user.lastLogin = commonService.currentHKT()
        await user.save()
        await userActivityLogSchema.create(
            { ...userLog, isSuccess: true, description: 'Success login attempt' }
        )
        return {
            result: true,
            message: "Success login",
            token: token
        }
    }

    register = async (body) => {
        const existUser = await Users.findOne({ email: body.email.trim() })
        if (existUser) {
            return { success: false, message: "Email already in use" }
        }
        const hashedpwd = await bcrypt.hash(body.password, 10);
        const newUser = new Users({
            name: body.name,
            email: body.email,
            password: hashedpwd,
            age: body.age,
            role: body.role,
            isActive: body.isActive,
            lastLogin: commonService.currentHKT()
        })
        await newUser.save()
        const token = jwtService.createToken(body)
        return { success: true, message: "User registered successfully", token: token }
    }
}
const userService = new UserService()
export default userService