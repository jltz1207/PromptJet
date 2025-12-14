import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import LoginButton from '../ui/button/Login/LoginButton';
import { CustomDatePicker } from '../ui/formElement/CustomDatePicker';
import ValidationArea from '../ui/formElement/ValidationArea';
import DescriptionText from '../ui/header/DescriptionText';
import HighlightHeader from '../ui/header/HighlightHeader';

interface prop {
  form: any
  setForm: (form: any) => void
  setRegisterStep: (step: string) => void
}

export default function Register_EnterBirth(p: prop) {
  const [tempForm, setTempForm] = useState<any>(p.form)
  const [error, setError] = useState<string | undefined>(undefined)
  const today = new Date()
  const handleNext = () => {
    if (tempForm.birth >= today) {
      setError("Birth can't greater than today")
      return;
    }
    setError(undefined)

    p.setForm(tempForm)
    p.setRegisterStep('3')
  }

  return (
    <View style={tw`gap-4`}>
      <View>
        <HighlightHeader title={`What's your date of birth?`} position={'left'} />
        <DescriptionText text={'Choose your date of birth.'} position={'left'} />
      </View>
      <CustomDatePicker value={tempForm.birth} onChange={(birth) => { setTempForm({ ...tempForm, birth: birth }) }} />
      <LoginButton
        text={'Next'}
        onClick={handleNext} />
      <ValidationArea errorText={error} />

    </View>
  )
}