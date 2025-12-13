import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  text: string
  imgSrc?: string
  onClick: () => void
}
export default function RoundedLoginButton(p: prop) {
  return (
    <View style={tw`flex-row gap-2 justify-center items-center rounded-3xl border-2 border-gray-400 h-12`}>
      {p.imgSrc &&
        <View style={tw`w-7 h-7`}>
          <Image  resizeMode="contain"  style={tw`h-full w-full `} source={p.imgSrc as ImageSourcePropType} />
        </View>}
      <Text >{p.text}</Text>
    </View>
  )
}