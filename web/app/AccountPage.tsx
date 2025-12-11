import logoutSrc from '@/assets/images/setting/icon/logout.png';
import SettingRow, { SettingRowProps } from '@/components/ui/setting/SettingRow';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
export default function ProfilePage() {
 
  const router = useRouter();
  const logout = () => {
    router.navigate('/LoginPage');
  }
  const settingRows: SettingRowProps[] = [
    { name: 'Logout', iconPath: logoutSrc, onClick: () => { logout();} },


  ]




  return (
    <View style={tw`flex-col h-full`}>

      {
        settingRows.map((row, index) => (
          <SettingRow key={index} name={row.name} iconPath={row.iconPath} onClick={row.onClick} />
        ))
      }
    </View>
  )
}
