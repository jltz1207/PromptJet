import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  text: string
  onClick: () => void
  bg?:'white' | 'blue' 
}
export default function LoginButton(p: prop) {
  return (
    <View onTouchEnd={p.onClick} style={tw`${p.bg === undefined || p.bg === 'blue'?'bg-blue-400' : 'bg-white border-2 border-gray-200'} flex-row items-center justify-center h-10 rounded-md w-full`}>
      <Text style={tw`${p.bg === undefined || p.bg === 'blue'?'text-white' : 'text-black'} `}>
        {p.text}
      </Text>
    </View>
  )
}