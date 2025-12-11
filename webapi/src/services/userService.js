import Users from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import jwtService from './jwtService.js'
import User from '../models/user.js'
import commonService from './commonService.js'
import userActivityLog from '../models/userActivityLog.js'

class UserService {
    getAllUsers = async () => {
        return await Users.find()
    }

    login = async (req) => {
        // validation email and password
        if (!req.body.email || !req.body.password) {
            return { success: false, message: "Email and password are required" }
        }

        const user = await Users.findOne({ email: req.body.email.trim() }).select('+password')
        const userLog = {
            userId: user ? user._id : null,
            email: req.body.email,
            activityType: 'login',
            timestamp: commonService.currentHKT(),
            metadata: {
                ipAddress: req.ip,
                device: { platform: req.headers['user-agent'] || 'Unknown' }
            }
        }
        if (user === null) {
            userActivityLog.create(
                { ...userLog, isSuccess: false, description: 'Failed login attempt due to incorrect email' }
            )
            return { success: false, message: "Incorrect email" }
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            await userActivityLog.create(
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
            message: "Success login attempt",
            token: token
        }
    }

    register = async (req) => {
        //check for mandatory fields
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.birth) {
            return { success: false, message: "Name, email, password and birth date are required" }
        }

        const userLog = {
            userId: null,
            email: req.body.email,
            activityType: 'register',
            timestamp: commonService.currentHKT(),
            metadata: {
                ipAddress: req.ip,
                device: { platform: req.headers['user-agent'] || 'Unknown' }
            }
        }
        const existUser = await Users.findOne({ email: req.body.email.trim() })
        if (existUser) {
            userActivityLog.create(
                { ...userLog, isSuccess: false, description: "Email already in use" }
            )
            return { success: false, message: "Email already in use" }
        }
        const hashedpwd = await bcrypt.hash(req.body.password, 10);
        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashedpwd,
            birth: req.body.birth,
            role: req.body.role,
            isActive: true,
            lastLogin: commonService.currentHKT()
        })
        await newUser.save()


        userActivityLog.create(
            { ...userLog, userId: newUser._id, isSuccess: true, description: "Success register attempt" }
        )

        const token = jwtService.createToken({userId: newUser._id, email: req.body.email})
        return { success: true, message: "Success register attempt", token: token }
    }
}
const userService = new UserService()
export default userService