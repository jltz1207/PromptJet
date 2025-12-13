import logoutSrc from '@/assets/images/setting/icon/logout.png';
import ProfileHeader from '@/components/Account/ProfileHeader';
import SettingRow, { SettingRowProps } from '@/components/ui/setting/SettingRow';
import { store } from '@/store/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
export default function ProfilePage() {
 
  const router = useRouter();
  const logout = () => {
    router.navigate('/LoginPage');
    store.accountStore.logout()
  }
  const settingRows: SettingRowProps[] = [
    { name: 'Logout', iconPath: logoutSrc, onClick: () => {logout() } },
  ]




  return (
    <View style={tw`flex h-full w-full px-6`}>
      <ProfileHeader />
      {
        settingRows.map((row, index) => (
          <SettingRow key={index} name={row.name} iconPath={row.iconPath} onClick={row.onClick} />
        ))
      }
    </View>
  )
}
