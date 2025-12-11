import BlockDashboard from '@/components/ui/shortcut/Block/BlockDashboard';
import ShortcutHeader from '@/components/ui/shortcut/header/ShortcutHeader';
import { View } from 'react-native';

export default function HomePage() {


  return (
    <View style={{ flex: 1 }}>
      <ShortcutHeader />
      <BlockDashboard />

    </View>
  );
}
