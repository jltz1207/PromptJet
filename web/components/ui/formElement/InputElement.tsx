import visbleSrc from '@/assets/images/formElement/input/visible.png';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  title?: string,
  value?: string,
  height?: string,
  placeholder?: string,
  model?: any,
  isSecure?: boolean,
  onChangeText?: (text: string) => void,
}
export default function InputElement(p: prop) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(p.isSecure || false)
  return (
    <View style={tw`flex flex-col gap-2`}>
      {p.title != null ?
        <Text>{p.title}</Text> : ''}
      <TextInput
        style={tw`relative border-2 border-gray-400 w-full rounded-md pl-2`}
        value={p.model?.value ?? p.value}
        onChangeText={p.onChangeText}
        placeholder={p.placeholder}
        secureTextEntry={isShowPassword}
      />
      {p.isSecure &&
        <TouchableOpacity style={tw`absolute right-2 top-9 w-6 h-6`} onPress={() => setIsShowPassword(!isShowPassword)}>
          <Image source={visbleSrc} style={tw`w-full h-full`} />
        </TouchableOpacity>
      }
    </View>
  )
}