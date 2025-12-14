import { store } from '@/store/store';
import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import LoginButton from '../ui/button/Login/LoginButton';
import InputElement from '../ui/formElement/InputElement';
import ValidationArea from '../ui/formElement/ValidationArea';
import DescriptionText from '../ui/header/DescriptionText';
import HighlightHeader from '../ui/header/HighlightHeader';

interface prop {
  form: any
  setForm: (form: any) => void
  setRegisterStep: (step: string) => void
}

const Register_EnterEmail = (p: prop) => {
  const [tempForm, setTempForm] = useState<any>(p.form)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleNext = async () => {
    if (tempForm.email === "") {
      setError("Please enter the email")
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempForm.email)) {
      setError("Incorrect format in email")
      return;
    }
    await store.accountStore.register_checkEmail(tempForm.email).then(
      (data) => {
        if (data.success) {
          setError(undefined)
          p.setForm(tempForm)
          p.setRegisterStep('5')
        }
        else {
          console.log(data)
          setError(data.message)
        }
      })
  }

  return (
    <View style={tw`gap-4`}>
      <View>
        <HighlightHeader title={`What's your email address?`} position={'left'} />
        <DescriptionText text={'Enter the email address at which you can be contacted and receive the notification.'} position={'left'} />
      </View>
      <InputElement placeholder={"Email address"} value={tempForm.email} onChangeText={(text: string) => setTempForm({ ...tempForm, email: text })} />
      <LoginButton text={'Next'} onClick={handleNext} />
      <LoginButton bg={'white'} text={'Sign up with Mobile Number'} onClick={() => { p.setForm(tempForm); p.setRegisterStep('4') }} />
      <ValidationArea errorText={error} />

    </View>
  );
};

export default Register_EnterEmail;