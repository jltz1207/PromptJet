import userService from '../../services/userService.js'
class UserController {
    getAllUsers = async (req, res) => {
        return res.json({ users: await userService.getAllUsers() })
    }

    login = async (req, res) => {
        try {
            return res.json(await userService.login(req))

        }
        catch (e) {
            console.log(e)
            return res.json({ error: e, success: false, token: null })
        }
    }

    register = async (req, res) => {
        try {
            return res.json(await userService.register(req))
        }
        catch (e) {
            console.log(e)
        }
    }

       
    logout =  (req, res) => {
        try {
            return res.json({ success: true, message: "User logged out successfully" })
        }
        catch (e) {
            console.log(e)
            return res.json({ error: e, success: false })
        }
    }

    forgot = async (req, res) =>{
         try {
            return res.json(await userService.forgot(req) )
        }
        catch (e) {
            console.log(e)
            return res.json({ error: e, success: false })
        }
    }

    forgot_submitCode = async (req,res) =>{
        try{
            return res.json(await userService.forgot_submitCode(req))
        }
        catch (e) {
            console.log(e)
            return res.json({ error: e, success: false })
        }
    }
    forgot_submitPassword = async (req,res) =>{
        try{
            return res.json(await userService.forgot_submitPassword(req))
        }
        catch (e) {
            console.log(e)
            return res.json({ error: e, success: false })
        }
    }
}

const userController = new UserController()
export default userController
