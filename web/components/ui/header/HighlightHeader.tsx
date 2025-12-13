import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  title: string
  position: 'left' | 'right' | 'center'
}
export default function HighlightHeader(p: prop) {
  return (
    <View style={tw`flex-row ${p.position === 'right' ? 'justify-end' : p.position === 'center' ? 'px-6 justify-center' : ''}`}>
      <Text style={tw`text-7 font-bold flex-row ${p.position === 'right' ? 'justify-end' : p.position === 'center' ? ' justify-center' : ''}`}>
        {p.title}
      </Text>
    </View>
  )
}