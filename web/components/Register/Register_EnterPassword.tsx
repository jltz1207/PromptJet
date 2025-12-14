import successSrc from '@/assets/images/account/success.png';
import { store } from '@/store/store';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import tw from 'twrnc';
import LoginButton from '../ui/button/Login/LoginButton';
import InputElement from '../ui/formElement/InputElement';
import ValidationArea from '../ui/formElement/ValidationArea';
import DescriptionText from '../ui/header/DescriptionText';
import HighlightHeader from '../ui/header/HighlightHeader';
import PopupWindow from '../ui/popup/PopupWindow';

interface prop {
  form: any
  setForm: (form: any) => void
  setRegisterStep: (step: string) => void
}

const Register_EnterPassword = (p: prop) => {
  const [tempForm, setTempForm] = useState<any>(p.form)
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<boolean>(false)
  const [username, setUsername] = useState<string>(store.accountStore.user?.fullName ?? "");
  const renders = useRef(0);
  renders.current += 1;
  const handleSubmit = async () => {
    if (tempForm.password === "" || tempForm.confirmPassword === "") {
      setError("Password/Confirm Password can't be empty")
      return;
    }
    if (tempForm.password !== tempForm.confirmPassword) {
      setError("Password and Confirm Password must be the same")
      return;
    }


    setError(undefined)

    p.setForm(tempForm)
    console.log(tempForm)
    await store.accountStore.register(tempForm).then((data) => {
      if (data.success) {
        // log primitive snapshot (objects in console can be misleading)
        console.log('fullName primitive after register:', store.accountStore.user?.fullName)
        // update local state as a fallback to force immediate UI update
        setUsername(store.accountStore.user?.fullName ?? "")
        setSuccess(true)
        console.log(data)
      }
      else {
        setError(data.message)
      }
    })
  }
  const successJsx = (
    <View style={tw`flex-col h-full justify-center  gap-2 p-4 items-center`}>

      <Image style={tw`h-16 w-16 my-3`} resizeMode='contain' source={successSrc as ImageSourcePropType} />
      <HighlightHeader title={`Hello${store.accountStore.user?.fullName ? ' ' + store.accountStore.user.fullName : ''}, your account is created.`}  position={'center'} />
      <DescriptionText text={'Please proceed with verifying email.'} position={'center'} />
      <LoginButton text={'Proceed'}
        onClick={() => { }} />
      <ValidationArea errorText={error} />
    </View>
  )
  return (
    <View style={tw`gap-4`}>
      <View>
        <HighlightHeader title={`Create a password`} position={'left'} />
        <DescriptionText text={`Create a password with at least 6 letters or numbers. It should be something that others can't guess.`} position={'left'} />
      </View>
      <InputElement isSecure={true} placeholder={"Password"} value={tempForm.password} onChangeText={(text: string) => setTempForm({ ...tempForm, password: text })} />
      <InputElement isSecure={true} placeholder={"Confirm password"} value={tempForm.confirmPassword} onChangeText={(text: string) => setTempForm({ ...tempForm, confirmPassword: text })} />
      <LoginButton text={'Submit'} onClick={handleSubmit} />
      <ValidationArea errorText={error} />
      {/* debug: show observable value to confirm reactivity */}
      <PopupWindow
        key={store.accountStore.user?.fullName ?? 'nouser'}
        h={78}
        jsx={successJsx}
        isVisible={success}
        setVisible={() => { }} />
    </View>
  );
};

export default observer(Register_EnterPassword);