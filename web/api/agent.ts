import { LoginForm } from '@/models/Account'
import axios from 'axios'

axios.defaults.baseURL = "http://10.0.2.2:3000/api"
//process.env.PRODUCTION_API_URL

const Account = {
  login: (model: LoginForm) => axios.post<any>(`/user/login`, model),
  register: (form: any) => axios.post<any>(`/user/register`, form),
  register_checkEmail: (email:string) => axios.post<any>(`/user/register/checkEmail`,{ email } ),
  forgot: (email: string) => axios.post<any>(`/user/forgot`, { email }),
  forgot_submitCode: (model: any) => axios.post<any>(`/user/forgot/submitCode`, model),
  forgot_submitPassword: (model: any) => axios.post<any>(`/user/forgot/submitPassword`, model)

}

const agent = {
  account: Account
}
export default agent