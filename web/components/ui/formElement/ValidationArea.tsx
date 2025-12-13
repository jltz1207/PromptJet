import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop {
  errorText?: string | undefined
}
export default function ValidationArea(p: prop) {
  return (
    <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-red-500`}>
          {p.errorText}
        </Text> 
    </View>
  ) 
}