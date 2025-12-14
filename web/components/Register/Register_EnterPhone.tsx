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

const Register_EnterPhone = (p: prop) => {
  const [tempForm, setTempForm] = useState<any>(p.form)
  const [error, setError] = useState<string | undefined>(undefined)
  const handleNext = () => {
    console.log(tempForm)
    if (tempForm.phone === "" ) {
      setError("Mobile number can't be empty")
      return;
    }
    if (tempForm.phone.length !== 8   ) {
      setError("Mobile number's digit must be 8")
      return;
    }
    setError(undefined)

    p.setForm(tempForm)
    p.setRegisterStep('5')
  }
  return (
    <View style={tw`gap-4`}>
      <View>
        <HighlightHeader title={`What's your mobile number?`} position={'left'} />
        <DescriptionText text={'Enter the mobile number on which you can be contacted. No one will see this on your profile.'} position={'left'} />
      </View>
      <InputElement isNumeric={true} placeholder={"Mobile number"} value={tempForm.phone} onChangeText={(text: string) => setTempForm({ ...tempForm, phone: text })} />
      <LoginButton text={'Next'} onClick={() => {handleNext()}} />
      <LoginButton bg={'white'} text={'Sign up with email address'} onClick={() => { p.setRegisterStep('3') }} />
      <ValidationArea errorText={error} />
    </View>
  );
};

export default Register_EnterPhone;