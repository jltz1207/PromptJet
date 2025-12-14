export interface LoginForm{
    email:string
    password:string
}
export interface ForgotForm{
    email:string
    code?:string
    password?:string
    confirmPassword?:string
}

export interface RegisterForm{
    email:string
    password:string
    name:string
    birth:string
}

export interface User{
  email:string
    emailVerified:boolean
  fullName:string
  birth:string
  token:string
  profileImageUrl?:string
  preferences:any // theme, language
  role:string
}