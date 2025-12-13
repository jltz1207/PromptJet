import editSrc from '@/assets/images/account/profile/edit.png';
import emptyProfileSrc from '@/assets/images/account/profile/emptyProfile.png';
import { store } from '@/store/store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import tw from 'twrnc';


const ProfileImage = observer(function ProfileImage() {
  const user = store.accountStore.user
  // Normalize local asset import (may be a module id or a URL string on web)
  const localEmpty = typeof emptyProfileSrc === 'string' ? { uri: emptyProfileSrc } : emptyProfileSrc
  const profileSrc: ImageSourcePropType = user && user.profileImageUrl != null ? { uri: user.profileImageUrl as string } : localEmpty
  return (
    <View style={tw`w-16 h-16 rounded-full relative `}>
      <Image
        style={[tw`w-full h-full rounded-full`]}
        source={profileSrc}
      />
      <View style={tw` absolute bottom-1 right-[-1] w-5 h-5 p-[3px] rounded-full bg-white flex items-center justify-center`}>
        <Image style={tw`w-full h-full rounded-full`} source={editSrc as ImageSourcePropType} />
      </View>
    </View>
  )
})

function ProfileHeader() {


  return (
    <View style={tw`flex-row items-center px-1 py-6`}>
      <ProfileImage />
      <View style={tw`ml-3 flex-1`}>
        {store.accountStore.user &&
          <View>
            <Text style={tw`text-5`}>{store.accountStore.user.name}</Text>
            <Text>{store.accountStore.user.email}</Text>
          </View>

        }
      </View>
    </View>
  )
}

export default observer(ProfileHeader)