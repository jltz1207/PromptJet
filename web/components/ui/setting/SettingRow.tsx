import rightArrowSrc from '@/assets/images/buttons/rightArrow.png';
import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';
export interface SettingRowProps {
  name: string,
  iconPath: string | number,
  onClick: () => void
}

export default function SettingRow(p: SettingRowProps) {
  return (
    <View style={tw`flex-row items-center justify-center py-4  gap-4`} onTouchEnd={()=>p.onClick()}>
      <Image style={tw`h-6 w-6`} source={typeof p.iconPath === 'number' ? p.iconPath : { uri: p.iconPath }} />
      <Text style={tw`text-black text-6 flex-grow`} >{p.name}</Text>
      <Image style={tw`h-6 w-6 mr-2`} source={rightArrowSrc} />

    </View>
  )
}
