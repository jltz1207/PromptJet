import accountSrc from '@/assets/images/bottomNav/account.png';
import aiSrc from '@/assets/images/bottomNav/ai.png';
import shortcutSrc from '@/assets/images/bottomNav/shortcut.png';

import selected_accountSrc from '@/assets/images/bottomNav/black/account.png';
import selected_aiSrc from '@/assets/images/bottomNav/black/ai.png';
import selected_shortcutSrc from '@/assets/images/bottomNav/black/shortcut.png';

import BottomNav, { navItemProp } from '@/components/ui/bottomNav/BottomNav';
import { Stack, usePathname } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import tw from 'twrnc';
export default function RootLayout() {
  const currentPath = usePathname();
  const paths_without_bottomNav = ['/LoginPage'];
  const check_path = paths_without_bottomNav.includes(currentPath)
 


   //const router = useRouter(); onldsfsdfy can use inside the stack/screen
    const navItems : navItemProp[] = [
    {  name: 'Shortcut', iconPath: shortcutSrc,selectedIconPath:selected_shortcutSrc,  href: { pathname: '/ShortcutPage' }   },
    { name: 'Ai', iconPath: aiSrc,selectedIconPath:selected_aiSrc,  href:{ pathname: '/AiPage'}  },
    { name: 'Account', iconPath: accountSrc,selectedIconPath:selected_accountSrc,  href:{ pathname: '/AccountPage'}  },
  ];
  return (//h-screen not working
      <View style={tw` h-full w-full flex-col mt-10`}>
      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' }
        }}
      />
          {!check_path && <BottomNav itemProps={navItems}/>}  

    </View>
  );
}
