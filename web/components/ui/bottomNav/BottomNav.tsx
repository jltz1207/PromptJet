import { Href, Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';


interface navItemProps {
  itemProps: navItemProp[]
}

export default function BottomNav(p: navItemProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={tw`flex-row bg-white mb-8  h-20 border-t border-gray-300`}>
      {p.itemProps.map((prop, index) => (
        <View key={index} style={tw`flex-grow  flex p-4 items-center justify-center`}>
          <NavItem selectedIconPath={prop.selectedIconPath} href={prop.href} isSelected={selectedIndex === index} setSelectedIndex={() => { setSelectedIndex(index) }} name={prop.name} iconPath={prop.iconPath} />
        </View>
      ))}
    </View>
  )
}

export interface navItemProp {
  isSelected?: boolean | undefined,
  name: string,
  iconPath: string | number,
  selectedIconPath: string | number,
  setSelectedIndex?: () => void | undefined,
  href: Href
}
const NavItem = (p: navItemProp) => {
  const combinedOnClick = () => {
    if (p.setSelectedIndex !== undefined) {
      p.setSelectedIndex()
    }
  }
  const src = () => {
    if (p.isSelected) {
      if (typeof p.selectedIconPath === 'number') {
        return p.selectedIconPath
      }
      else{
        return { uri: p.selectedIconPath }
      }
    }
    else {
      if (typeof p.iconPath === 'number') {
        return p.iconPath
      }
      else{
        return { uri: p.iconPath }
      }
  }
  }
    return (
      <Link href={p.href}>
        <View style={tw`flex-col items-center justify-center `} onTouchEnd={() => { combinedOnClick() }}>
          <Image style={tw`h-7 w-7`} source={src()} />
          <Text style={tw`${p.isSelected ? 'text-black':'text-[#B1ACAC]'} text-3`} >{p.name}</Text>
        </View>
      </Link>

    )
  }
