import LoginButton from '@/components/ui/button/Login/LoginButton';
import RoundedLoginButton from '@/components/ui/button/Login/RoundedLoginButton';
import HorizontalLine from '@/components/ui/formElement/HorizontalLine';
import HyperlinkElement from '@/components/ui/formElement/HyperlinkElement';
import InputElement from '@/components/ui/formElement/InputElement';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import tw from 'twrnc';

import appleSrc from '@/assets/images/companyLogo/appleLogo.png';
import googleSrc from '@/assets/images/companyLogo/googleLogo.png';
import promptSrc from '@/assets/images/companyLogo/promptJet.png';
import ValidationArea from '@/components/ui/formElement/ValidationArea';
import { LoginForm } from '@/models/Account';
import { store } from '@/store/store';
import { useRouter } from 'expo-router';

const LoginPage = () => {
  const [loginModel, setLoginModel] = useState<LoginForm>({ email: "", password: "" })
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter();
  const handleSubmit = () => {
    setError(undefined)
    if (loginModel.email !== "" && loginModel.password !== "")
      store.accountStore.login(loginModel).then((data) => {
        if(data.success){
          router.navigate('/ShortcutPage')
        }
        else{
          setError(data.message)
        }

      }).catch((error)=>{
        throw error
      })
      else {
        setError("Please enter the email and password.")
      }
  }

  return (
    <View style={tw`w-full flex flex-col gap-3 px-3 `}>
      <View style={tw`flex-row justify-center h-12 mt-14 mb-6`}>
        <Image style={tw`h-full w-full`} resizeMode='contain' source={promptSrc as ImageSourcePropType} />
      </View>
      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-5`}>
          Sign in
        </Text>
      </View>
      <InputElement title="Email" value={loginModel.email} onChangeText={(text: string) => setLoginModel({ ...loginModel, email: text })} />
      <InputElement title="Password" value={loginModel.password} onChangeText={(text: string) => setLoginModel({ ...loginModel, password: text })} isSecure={true} />
      <HyperlinkElement
        color="blue-700"
        position={'right'}
        text={'Forgot Password?'}
        onClick={() => { router.navigate('/ForgotPage')}} />
      <LoginButton text={'Submit'}
        onClick={handleSubmit} />

      <ValidationArea errorText={error} />
      <HorizontalLine text={'Or'} my={5} />
      <RoundedLoginButton
        text={'Continue with Apple'}
        onClick={() => { }}
        imgSrc={appleSrc} />
      <RoundedLoginButton
        text={'Continue with Google'}
        onClick={() => { }}
        imgSrc={googleSrc} />
      <HyperlinkElement
        my={5}
        position={'center'}
        text={'Create a Account?'}
        onClick={() => {router.navigate('/RegisterPage') }} />
    </View>
  )
}

export default LoginPage