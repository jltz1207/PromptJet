import { store } from '@/store/store'
import React, { useState } from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import LoginButton from '../ui/button/Login/LoginButton'
import CustomCodeField from '../ui/formElement/CustomCodeField'
import HyperlinkElement from '../ui/formElement/HyperlinkElement'
import ValidationArea from '../ui/formElement/ValidationArea'
import DescriptionText from '../ui/header/DescriptionText'
import HighlightHeader from '../ui/header/HighlightHeader'

interface prop {
  email: string
  setForgotStep: (step: '1' | '2' | '3') => void
}
export default function Forgot_EnterCode(p: prop) {
  const [error, setError] = useState<string | undefined>(undefined)
  const [code, setCode] = useState<string>("")
  
  const handleSubmit = async() => {
    setError(undefined)
    if (p.email !== "" && code !== "") {
      console.log("Entered")
      await store.accountStore.forgot_submitCode({email: p.email, code}).then((data) => {
        if (data.success) {
          console.log(data)
          p.setForgotStep('3')
        }
        else {
          setError(data.message)
        }

      }).catch((error) => {
        throw error
      })
    }
    else {
      setError("Please enter the code")
    }
  }
  
  return (
    <View>
      <View style={tw`w-full h-full flex flex-col justify-center  gap-4 `}>
        <HighlightHeader title={'Check your Email'} position={'center'} />
        <DescriptionText text={`We sent a code to ${p.email}`} position={'center'} /> 
        <CustomCodeField code={code} setCode={setCode} />

        <LoginButton text={'Submit'}
          onClick={handleSubmit} />
        <ValidationArea errorText={error} />
        <HyperlinkElement
          color="blue-700"
          position={'right'}
          text={'back to enter email?'}
          onClick={() => { p.setForgotStep('1') }} />
      </View>
    </View>
  )
}