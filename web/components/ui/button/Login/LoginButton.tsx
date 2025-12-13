import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  text: string
  onClick: () => void
}
export default function LoginButton(p: prop) {
  return (
    <View onTouchEnd={p.onClick} style={tw`bg-blue-400 flex-row items-center justify-center h-10 rounded-md w-full`}>
      <Text style={tw`text-white`}>
        {p.text}
      </Text>
    </View>
  )
}