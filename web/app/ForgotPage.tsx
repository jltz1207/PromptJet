
import Forgot_EnterCode from '@/components/Forgot/Forgot_EnterCode';
import Forgot_EnterEmail from '@/components/Forgot/Forgot_EnterEmail';
import Forgot_EnterPassword from '@/components/Forgot/Forgot_EnterPassword';
import ReturnHeader from '@/components/ui/header/ReturnHeader';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function ForgotPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [forgotStep, setForgotStep] = useState<'1' | '2' | '3'>('1')

  const showForgotStep = () => {

    if (forgotStep === '1') {
      return (
        <Forgot_EnterEmail setForgotStep={setForgotStep} email={email} setEmail={setEmail} />
      )
    }
    else if (forgotStep === '2') {
      return (
        <Forgot_EnterCode email={email} setForgotStep={setForgotStep} />
      )
    }
    else {
      return (
        <Forgot_EnterPassword email={email} setForgotStep={setForgotStep} />
      )
    }
  }

  return (
    <View style={tw`w-full flex flex-col  px-3`}>
      <ReturnHeader
        title={'Forgot Password'}
        returnOnClick={() => {
          router.navigate('/LoginPage')
        }} />

      {showForgotStep()}




    </View>
  )
}