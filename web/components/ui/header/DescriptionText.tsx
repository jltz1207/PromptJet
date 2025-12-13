import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  text: string
  position: 'left' | 'right' | 'center'
}
export default function DescriptionText(p: prop) {
  return (
    <View style={tw`flex-row ${p.position === 'right' ? 'justify-end' : p.position === 'center' ? 'px-6 justify-center' : ''}`}>
      <Text style={tw`text-5  text-gray-400 font-bold flex-row ${p.position === 'right' ? 'justify-end' : p.position === 'center' ? ' justify-center' : ''}`}>
        {p.text}
      </Text>
    </View>
  )
}