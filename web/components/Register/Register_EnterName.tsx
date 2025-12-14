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

export default function Register_EnterName(p: prop) {
  const [tempForm, setTempForm] = useState<any>(p.form)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleNext = () => {
    if (tempForm.firstName === "" || tempForm.firstName === "") {
      setError("First name and Last name can't be empty")
      return;
    }
    setError(undefined)

    p.setForm(tempForm)
    p.setRegisterStep('2')
  }
  return (
    <View style={tw`gap-4`}>
      <View>
        <HighlightHeader title={`What's your name?`} position={'left'} />
        <DescriptionText text={'Enter the name you use in real life'} position={'left'} />
      </View>
      <View style={tw`flex-row gap-2`}>
        <InputElement flexGrow={true} placeholder={"First name"} value={tempForm.firstName} onChangeText={(text: string) => setTempForm({ ...tempForm, firstName: text })} />
        <InputElement flexGrow={true} placeholder={"Last name"} value={tempForm.lastName} onChangeText={(text: string) => setTempForm({ ...tempForm, lastName: text })} />
      </View>
      <LoginButton
        text={'Next'}
        onClick={handleNext} />
      <ValidationArea errorText={error} />

    </View>
  )
}