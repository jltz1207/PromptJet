import visbleSrc from '@/assets/images/formElement/input/visible.png';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  title?: string,
  value?: string,
  height?: string,
  placeholder?: string,
  isSecure?: boolean,
  onChangeText?: (text: string) => void,
  flexGrow?: boolean
  isNumeric?: boolean
}
export default function InputElement(p: prop) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(p.isSecure || false)
  return (
    <View style={tw` flex flex-col gap-2 ${p.flexGrow ? `flex-1` : ''}`}>
      {p.title != null ?
        <Text>{p.title}</Text> : ''}
      <View style={tw`relative `}>
        <TextInput
          style={tw`  border-2 border-gray-400 w-full rounded-md pl-2`}
          value={p.value}
          onChangeText={p.onChangeText}
          placeholder={p.placeholder}
          secureTextEntry={isShowPassword}
          keyboardType={p.isNumeric ? 'numeric' : 'default'}
        />
        {p.isSecure && //absolute right-2 top-9 w-6 h-6
          <TouchableOpacity style={tw`absolute right-2 h-full justify-center`} onPress={() => setIsShowPassword(!isShowPassword)}>
            <Image source={visbleSrc} style={tw`w-6 h-6`} />
          </TouchableOpacity>
        }
      </View>

    </View>
  )
}