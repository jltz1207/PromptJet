import successSrc from '@/assets/images/account/success.png'
import { store } from '@/store/store'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'
import tw from 'twrnc'
import LoginButton from '../ui/button/Login/LoginButton'
import InputElement from '../ui/formElement/InputElement'
import ValidationArea from '../ui/formElement/ValidationArea'
import DescriptionText from '../ui/header/DescriptionText'
import HighlightHeader from '../ui/header/HighlightHeader'
import PopupWindow from '../ui/popup/PopupWindow'

interface prop {
  email: string
  setForgotStep: (step: '1' | '2' | '3') => void
}
export default function Forgot_EnterPassword(p: prop) {
  const [error, setError] = useState<string | undefined>(undefined)
  const [pwModel, setPwModel] = useState<any>({ email: p.email, password: "", confirmPassword: "" })
  const [success, setSuccess] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setError(undefined)
    if (p.email !== "" && pwModel.password !== "" && pwModel.confirmPassword) {
      if (pwModel.password !== pwModel.confirmPassword) {
        setError("The Password isn't consistent to the Confirm Password")
      }
      console.log("Entered")
      await store.accountStore.forgot_submitPassword(pwModel).then((data) => {
        if (data.success) {
          setSuccess(true)
          console.log(data)
        }
        else {
          setError(data.message)
        }

      }).catch((error) => {
        throw error
      })
    }
    else {
      setError("Please enter the Password & Confirm Password")
    }
  }

  const successJsx = (
    <View style={tw`flex-col h-full justify-center  gap-2 p-4 items-center`}>

      <Image style={tw`h-16 w-16 my-3`} resizeMode='contain' source={successSrc as ImageSourcePropType} />
      <HighlightHeader title={'Password updated successfully'} position={'center'} />
      <DescriptionText text={'Your password has been created'} position={'center'} />
      <LoginButton text={'Sign up'}
        onClick={() => router.navigate('/LoginPage')} />
      <ValidationArea errorText={error} />
    </View>
  )
  return (
    <View style={tw`w-full h-full flex flex-col justify-center  gap-4 `}>
      <HighlightHeader title={'Reset Password'} position={'center'} />
      <DescriptionText text={'Enter your new password. Remember this time!'} position={'center'} />
      <InputElement title="Password" value={pwModel.password} model={pwModel} onChangeText={(text: string) => setPwModel({ ...pwModel, password: text })} isSecure={true} />
      <InputElement title="Confirm Password" value={pwModel.confirmPassword} model={pwModel} onChangeText={(text: string) => setPwModel({ ...pwModel, confirmPassword: text })} isSecure={true} />

      <LoginButton text={'Submit'}
        onClick={handleSubmit} />
      <ValidationArea errorText={error} />
      <PopupWindow
        h={78}
        jsx={successJsx}
        isVisible={success}
        setVisible={() => { }} />

    </View>
  )

}

