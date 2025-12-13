import { View, Text } from 'react-native'
import React, { useState } from 'react'
import HighlightHeader from '../ui/header/HighlightHeader'
import InputElement from '../ui/formElement/InputElement'
import LoginButton from '../ui/button/Login/LoginButton'
import ValidationArea from '../ui/formElement/ValidationArea'
import HyperlinkElement from '../ui/formElement/HyperlinkElement'
import tw from 'twrnc';
import { useRouter } from 'expo-router'
import { store } from '@/store/store'

interface prop{
  email:string
  setEmail: (s:string)=>void
  setForgotStep: (step:'1' | '2' | '3')=>void
}
export default function Forgot_EnterEmail(p:prop) {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)
  
  const handleSubmit = () => {
    setError(undefined)
    if (p.email !== "") {
      console.log("Entered")
      store.accountStore.forgot(p.email).then((data) => {
        if (data.success) {
          console.log(data)
          p.setForgotStep('2')
        }
        else {
          setError(data.message)
        }

      }).catch((error) => {
        throw error
      })
    }
    else {
      setError("Please enter the email")
    }
  }
  return (
    <View>
      <View style={tw`w-full h-full flex flex-col justify-center  gap-4 `}>
        <HighlightHeader title={'Forgot Your Password and Continue'} position={'center'} />
        <InputElement value={p.email} onChangeText={(text: string) => p.setEmail(text)} />
        <LoginButton text={'Submit'}
          onClick={handleSubmit} />

        <ValidationArea errorText={error} />
        <HyperlinkElement
          color="blue-700"
          position={'right'}
          text={'back to login?'}
          onClick={() => { router.navigate('/LoginPage') }} />
      </View>
    </View>
  )
}