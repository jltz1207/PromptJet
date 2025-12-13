import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

interface prop{
    my?:number
  position?:'left' | 'right' | 'center'
  text:string
  onClick:()=>void
  color?: string
}
const HyperlinkElement = (p:prop) => {
  return (
    <View onTouchEnd={p.onClick} style={tw`flex flex-row ${p.my?`my-${p.my}`:''} ${ p.position !== undefined &&p.position ==='right'? `justify-end`: p.position !== undefined &&p.position ==='center'?'justify-center':``}`} >
      <Text style={tw`${p.color?`text-${p.color}`:`text-black`} text-`} >
        {p.text}
        </Text>
    </View>
  )
}

export default HyperlinkElement