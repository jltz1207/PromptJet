import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

export default function CustomProgressBar(p: { visible: boolean }) {
  if(!p.visible) return null
  return (
   

        <View style={tw`absolute h-full w-full flex justify-center items-center `}>
          <ActivityIndicator size="large" />
        </View>
   

  )
}