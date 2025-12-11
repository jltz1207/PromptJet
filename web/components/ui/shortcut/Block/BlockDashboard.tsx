import chatIcon from '@/assets/images/blockIcon/chat.png';
import emailIcon from '@/assets/images/blockIcon/email.png';
import paraIcon from '@/assets/images/blockIcon/paraphrase.png';
import sumIcon from '@/assets/images/blockIcon/summary.png';
import writingIcon from '@/assets/images/blockIcon/writing.png';
import BlockDiv, { BlockProp } from '@/components/ui/shortcut/Block/BlockDiv';
import { ScrollView, View } from 'react-native';
import 'react-native-reanimated';
import tw from 'twrnc';

const BlockArray: { left: BlockProp, right: BlockProp }[] = [
  // icon need declare type in images.d.ts
  { left: { name: 'Email', color: 'green', onClick: () => { }, iconPath: emailIcon }, right: { name: 'Chat', color: 'pink', onClick: () => { }, iconPath: chatIcon } },
  { left: { name: 'Paraphrase', color: 'purple', onClick: () => { }, iconPath: paraIcon }, right: { name: 'Summary', color: 'blue', onClick: () => { }, iconPath: sumIcon } },
  { left: { name: 'writing', color: 'yellow', onClick: () => { }, iconPath: writingIcon }, right: { name: 'Chat', color: 'blue', onClick: () => { }, iconPath: chatIcon } },
  { left: { name: 'Email', color: 'green', onClick: () => { }, iconPath: emailIcon }, right: { name: 'Chat', color: 'pink', onClick: () => { }, iconPath: chatIcon } },
  { left: { name: 'Paraphrase', color: 'purple', onClick: () => { }, iconPath: paraIcon }, right: { name: 'Summary', color: 'blue', onClick: () => { }, iconPath: sumIcon } },
  { left: { name: 'writing', color: 'yellow', onClick: () => { }, iconPath: writingIcon }, right: { name: 'Chat', color: 'blue', onClick: () => { }, iconPath: chatIcon } },
]
export default function BlockDashboard() {

  return (//h-screen not working
    <View style={tw` h-full  flex-col mt-10`}>
      <ScrollView
        style={tw`bg-white rounded-xl mb-2  h-full  flex-col`}
        showsVerticalScrollIndicator={true}
        bounces={false}
      >
        {BlockArray.map((block, i) => (
          <View key={i} style={tw`flex-row `}>
            <BlockDiv name={block.left.name} color={block.left.color} onClick={block.left.onClick} iconPath={block.left.iconPath} />
            <BlockDiv name={block.right.name} color={block.right.color} onClick={block.right.onClick} iconPath={block.right.iconPath} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
