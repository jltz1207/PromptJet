import threeDotSrc from '@/assets/images/buttons/threeDot.png';
import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import tw from 'twrnc';

export interface ThreeDotButtonProps {
  title: string,
  onClick?: () => void,
  icon: string | number
  color?: 'blue' | 'red'
}
interface props {
  propsList: ThreeDotButtonProps[]
  sheetTitle?: string
}

export default function ThreeDotButton(p: props) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const showActionSheet = () => {
    actionSheetRef.current?.show();
  }
  return (
    <View>
      <View onTouchEnd={showActionSheet}>
        <Image style={tw` w-5 h-5 `} source={threeDotSrc} />
      </View>
      <ActionSheet ref={actionSheetRef} containerStyle={tw`bg-transparent  `}>
        <View style={tw`bg-white rounded-2xl p-3 flex-col `}>
          {p.propsList.map((item, index) => (
            <TouchableOpacity key={index} style={tw`flex items-center justify-center h-12 ${index!==p.propsList.length -1 ?'border-b border-gray-300' :'' } `} onPress={() => { item.onClick ? item.onClick() : null; actionSheetRef.current?.hide() }}>
              <Text style={tw`${item.color === 'red' ? `text-red-500` : `text-blue-500`} text-lg font-bold `} >
                {item.title}
              </Text>
            </TouchableOpacity>))}
        </View>

        <View style={tw`mt-2 rounded-2xl bg-white`}>
          <TouchableOpacity style={tw`flex items-center justify-center h-16 `} onPress={() => { actionSheetRef.current?.hide() }}>
            <Text style={tw`text-lg font-bold text-gray-300`} >Cancel</Text>
          </TouchableOpacity>
        </View>

      </ActionSheet>
    </View>
  )
}