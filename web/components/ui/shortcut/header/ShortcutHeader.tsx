import React, { JSX } from 'react';
import { Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import RoundedButton from '../../button/RoundedButton';
import PopupWindow from '../../popup/PopupWindow';

export default function ShortcutHeader() {
  const [isVisible, setVisible] = React.useState(false);

  const jsxContent: JSX.Element = (
    <View style={tw`flex-col h-full justify-center items-center gap-2 `}>
      <Text style={tw`font-bold text-[16px]`}>Name for the new shortcut</Text>
      <Text style={tw`text-gray-400 font-bold text-[13px] `}>Please enter a name</Text>
      <TextInput style={tw`w-full h-9 border border-gray-300 rounded-lg text-base`} />
      <View style={tw`flex-row mt-3`}>
        <View style={tw`flex-row flex-1 justify-center items-center `} onTouchEnd={() => {}}>
          <Text style={tw`text-green-500`}>Submit</Text>
        </View>
        <View style={tw`flex-row flex-1 justify-center items-center`} onTouchEnd={() => setVisible(false)}>
          <Text style={tw`text-blue-500`}>Close</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw`h-16 flex-row justify-between px-4 py-2 items-center border-b border-gray-300 bg-white`}>
      <Text style={tw`text-7`}>Library</Text>
      <View style={tw`flex-row gap-2`}>
        <RoundedButton rounded='full' title='+' px={1} onClick={() => setVisible(true)} />
        <RoundedButton rounded='lg' title='Edit' px={3} />
      </View>
      <PopupWindow jsx={jsxContent} isVisible={isVisible} setVisible={setVisible} />
    </View>
  )
}