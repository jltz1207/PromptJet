import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  text: string
  my?:number
}

export default function HorizontalLine(p: prop) {
  return (
    <View style={tw`flex-row items-center gap-2 ${p.my?`my-${p.my}`:''}`}>
      <View style={tw`h-[1px] bg-gray-400 flex-grow `} />
      <Text >
        {p.text}
      </Text>
      <View style={tw`h-[1px] bg-gray-400 flex-grow`} />
    </View>
  )
}