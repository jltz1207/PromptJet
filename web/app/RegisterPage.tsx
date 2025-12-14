

import Register_EnterBirth from '@/components/Register/Register_EnterBirth';
import Register_EnterEmail from '@/components/Register/Register_EnterEmail';
import Register_EnterName from '@/components/Register/Register_EnterName';
import Register_EnterPassword from '@/components/Register/Register_EnterPassword';
import Register_EnterPhone from '@/components/Register/Register_EnterPhone';
import HyperlinkElement from '@/components/ui/formElement/HyperlinkElement';
import ReturnHeader from '@/components/ui/header/ReturnHeader';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function RegisterPage() {
  const router = useRouter()
  const today = new Date()
  const [form, setForm] = useState<any>(
    {
      // firstName: "",
      // lastName: "",
      // email: "",
      // phone: "",
      // password: "",
      // confirmPassword: "",
      birth: new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    }
  )
  const [registerStep, setRegisterStep] = useState<string>('1')

  const showRegisterStep = () => {

    if (registerStep === '1') {
      return (
        <Register_EnterName
          form={form}
          setForm={setForm}
          setRegisterStep={setRegisterStep} />
      )
    }
    else if (registerStep === '2') {
      return (
        <Register_EnterBirth
          form={form}
          setForm={setForm}
          setRegisterStep={setRegisterStep} />
      )
    }
     else if (registerStep === '3') {
      return (
        <Register_EnterEmail
          form={form}
          setForm={setForm}
          setRegisterStep={setRegisterStep} />
      )
    }
    else if (registerStep === '4') {
      return (
        <Register_EnterPhone
          form={form}
          setForm={setForm}
          setRegisterStep={setRegisterStep} />
      )
    }
   
    else if (registerStep === '5') {
      return (<Register_EnterPassword
        form={form}
        setForm={setForm}
        setRegisterStep={setRegisterStep}
      />)
    }
  }

  return (
    <View style={tw`w-full flex h-full  px-3`}>
      <ReturnHeader
        title={''}
        returnOnClick={() => {
          if (registerStep === '1') {
            router.navigate('/LoginPage')
          }
          else {
            setRegisterStep(String(Number(registerStep) - 1))
          }
        }} />

      {showRegisterStep()}
      <View style={tw`flex-1`}>

      </View>
      <HyperlinkElement
        color="blue-700"
        position={'center'}
        text={'I already have an account'}
        onClick={() => { router.navigate('/LoginPage') }} />
    </View>

  )
}