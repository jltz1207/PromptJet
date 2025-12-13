import React, { JSX } from 'react'
import { Modal, View } from 'react-native'
import tw from 'twrnc'
interface prop {
  jsx: JSX.Element
  isVisible: boolean
  setVisible: (bool: boolean) => void
  h?:number
}

const PopupWindow = (p: prop) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={p.isVisible}
      onRequestClose={() => p.setVisible(false)}
    >
      <View onTouchEnd={() => p.setVisible(false)} style={tw`flex-col items-center justify-center flex-1 bg-opacity-50 bg-black px-8`}>

        <View onTouchEnd={(e) => e.stopPropagation()} style={tw`bg-white py-6 rounded-lg flex-col items-center justify-between w-full ${p.h?`h-${p.h}`: 'h-48'} `}>
          <View style={tw`flex-1`}>
            {p.jsx}
          </View>
        </View>
      </View>

    </Modal>
  )
}

export default PopupWindow