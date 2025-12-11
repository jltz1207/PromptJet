import React from 'react'; //rfcp
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';
import ThreeDotButton, { ThreeDotButtonProps } from '../../button/ThreeDotButton';
export interface BlockProp {
  name: string
  color: 'red' | 'blue' | 'green' | 'purple' | 'pink' | 'yellow'
  onClick: () => void
  iconPath: number | string
}

function BlockDiv(p: BlockProp) {
  const list:ThreeDotButtonProps[] = [
    { title: 'Edit', onClick: () => { }, icon: 0, color: 'blue' },
    { title: 'Delete', onClick: () => { }, icon: 0, color: 'red' }
  ]

  return (
    <View style={tw`relative bg-${p.color}-300 h-32 rounded-lg flex-1  flex flex-col gap-2 items-center justify-center m-2`}>
      {/* <Image style={tw` w-6 h-6 absolute top-2 right-2`} source={pasteSrc} /> */}
      <View style={tw` w-5 h-5 absolute top-2 right-2`}>
        <ThreeDotButton propsList={list } />
      </View>
      <View style={tw` relative w-16 h-16`}>
        <View style={tw`opacity-25 z-0 rounded-full bg-white w-16 h-16`} />
        <Image style={tw`absolute w-10 h-10 z-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} source={typeof p.iconPath === 'number' ? p.iconPath : { uri: p.iconPath }} />
      </View>

      <Text style={tw`text-white`} >
        {p.name}
      </Text>
    </View>
  )
}


export default BlockDiv
