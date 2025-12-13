import returnSource from '@/assets/images/buttons/return.png';
import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
interface prop {
  title: string
  returnOnClick: () => void
}
export default function ReturnHeader(p: prop) {
  return (
    <View style={tw`flex-row h-10 items-center`}>
      <TouchableOpacity onPress={p.returnOnClick} style={tw`h-full flex-row items-center`}>
        <Image style={tw`w-5 h-5`} resizeMode='contain' source={returnSource as ImageSourcePropType} />
      </TouchableOpacity>
      <View style={tw`h-full flex-grow flex-row justify-center items-center  `}>
        <Text style={tw`text-4`} >{p.title}</Text>
      </View>
    </View>
  )
}