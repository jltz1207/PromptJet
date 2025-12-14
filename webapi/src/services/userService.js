import Users from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import jwtService from './jwtService.js'
import User from '../models/user.js'
import userActivityLog from '../models/userActivityLog.js'
import emailService from './emailService.js'
import timeUtils from '../utils/timeUtils.js'
import verification from '../utils/verification.js'
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
            timestamp: timeUtils.currentHKT(),
            metadata: {
                ipAddress: req.ip,
                device: { platform: req.headers['user-agent'] || 'Unknown' }
            }
        }
        if (user === null) {
            userActivityLog.create(
                { ...userLog, isSuccess: false, description: 'Failed login attempt due to incorrect email' }
            )
            return { success: false, message: "Please enter the correct email" }
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            await userActivityLog.create(
                { ...userLog, isSuccess: false, description: 'Failed login attempt due to incorrect password' }
            )
            return { success: false, message: "Please enter the correct password" }
        }
        const token = jwtService.createToken(user)
        user.lastLogin = timeUtils.currentHKT()
        await user.save()
        await userActivityLog.create(
            { ...userLog, isSuccess: true, description: 'Success login attempt' }
        )
        const resultUser = {
            email: user.email,
            emailVerified: newUser.emailVerified,
            fullName: user.fullName,
            birth: user.birth,
            token: token,
            profileImageUrl: user.profileImageUrl,
            preference: user.preference,
            role: user.role
        }
        return {
            success: true,
            message: "Success login attempt",
            user: resultUser
        }
    }

    register = async (req) => {
        //check 
        if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.confirmPassword || !req.body.birth) {
            return { success: false, message: "First Name, Last Name, Password, Confirm Password and Birth have to be provided." }
        }
        if (!req.body.email && !req.body.phone) {
            return { success: false, message: "One of Email and Phone have to be provided." }
        }
        if (!req.body.password !== !req.body.confirmPassword) {
            return { success: false, message: "Password and Confirm Password have to be the same." }
        }
        try {
            const currentTime = timeUtils.currentHKT()
            const userLog = {
                userId: null,
                email: req.body.email,
                activityType: 'register',
                timestamp: currentTime,
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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedpwd,
                birth: req.body.birth,
                isActive: true,
                lastLogin: currentTime
            })
            await newUser.save()


            userActivityLog.create(
                { ...userLog, userId: newUser._id, isSuccess: true, description: "Success register attempt" }
            )
            const token = jwtService.createToken({ userId: newUser._id, email: req.body.email })

            const resultUser = {
                email: newUser.email,
                emailVerified: newUser.emailVerified,
                fullName: newUser.fullName,
                birth: newUser.birth,
                token: token,
                profileImageUrl: newUser.profileImageUrl,
                preference: newUser.preference,
                role: newUser.role
            }
            return {
                success: true,
                message: "Success register attempt",
                user: resultUser
            }
        }
        catch (err) {
            console.error(err)
            return { success: false, message: err._message ?? "Server error happened." }
        }

    }

    register_checkEmail = async (req) => {
        console.log(req.body)
        if (req.body.email === undefined || req.body.email === "") {
            return { success: false, message: "No Email provided" }
        }

        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail(req.body.email)) {
            return { success: false, message: "Incorrect Email format" }
        }
        const existUser = await Users.findOne({ email: req.body.email.trim() })
        if (existUser) {
            return { success: false, message: "The Email is existed" }
        }
        return { success: true, message: "The Email can be used." }
    }

    forgot = async (req) => {
        const userLog = {
            userId: null,
            email: req.body.email,
            activityType: 'forgot_password',
            timestamp: timeUtils.currentHKT(),
            metadata: {
                ipAddress: req.ip,
                device: { platform: req.headers['user-agent'] || 'Unknown' }
            }
        }
        if (req.body.email == null) {
            userActivityLog.create(
                { ...userLog, isSuccess: false, description: "No email provided" }
            )
            return { success: false, message: "No email provided" }
        }

        const resultUser = await Users.findOne({ email: req.body.email })
        if (!resultUser) {
            userActivityLog.create(
                { ...userLog, isSuccess: false, description: "Not existed email" }
            )
            return { success: false, message: "Not existed email" }
        }
        const verifiedData = verification.generateVerficationCode(resultUser._id)
        const mailFormat = verification.getMailFormat(verifiedData.code)
        const mailOptions = {
            from: process.env.EMAIL_AC,
            to: req.body.email,
            subject: mailFormat.subject,
            text: mailFormat.text,
            html: mailFormat.html
        }

        try {
            userActivityLog.create(
                { ...userLog, isSuccess: true, description: "Email sent successfully" }
            )
            await emailService.transporter.sendMail(mailOptions);
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            userActivityLog.create(
                { ...userLog, isSuccess: false, description: "Failed to send email" }
            )
            console.error('Error sending email:', error);
            return { success: true, message: 'Failed to send email' };
        }
    }

    forgot_submitCode = async (req, res) => {
        if (!req.body.code) {
            return { success: false, message: "No code provided." }
        }
        if (!req.body.email) {
            return { success: false, message: "No email provided." }
        }
        const resultUser = await Users.findOne({ email: req.body.email })
        if (resultUser === null) {
            return { success: false, message: `No existed email with ${req.body.email}` }
        }
        const verificationResult = verification.verifyCode(resultUser._id, String(req.body.code))
        return verificationResult
    }

    forgot_submitPassword = async (req, res) => {
        if (!req.body.email) {
            return { success: false, message: "No Email provided" }
        }
        if (!req.body.password || !req.body.confirmPassword) {
            return { success: false, message: "No Password/Confirm Password provided" }
        }
        if (req.body.password !== req.body.password) {
            return { success: false, message: "Password and Confirm Password are not inconsistent" }
        }
        const resultUser = await Users.findOne({ email: req.body.email })
        if (resultUser === null) {
            return { success: false, message: `No existed email with ${req.body.email}` }
        }
        const newPassword = await bcrypt.hash(req.body.password, 10);
        resultUser.password = newPassword
        await resultUser.save()
        return { success: true, message: 'New Password is updated' }
    }
}


const userService = new UserService()
export default userService