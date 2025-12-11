import React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
interface prop{
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  imagePath?: string | number |undefined
  title?: string |undefined
  onClick?: () => void
  px?:number
}
export default function RoundedButton(p: prop) {
  const classifyRounded = () =>{
    switch (p.rounded) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case '2xl':
        return 'rounded-2xl';
      case '3xl':
        return 'rounded-3xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-none';
    }
  }
  return (
    <View onTouchEnd={p.onClick} style={tw`${classifyRounded()} ${p.px!==undefined?`px-${p.px}`:'px-2'} flex-row items-center justify-center opacity-25 border-gray border `}>
      {p.title !== undefined ? <Text>{p.title}</Text> : null }
     
      {p.imagePath !== undefined 
      ? <Image style={tw`h-6 w-6`} source={typeof p.imagePath === 'number' ? p.imagePath : { uri: p.imagePath }} /> 
      : null }

    </View>
  )
}