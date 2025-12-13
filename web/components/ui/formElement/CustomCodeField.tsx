import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: { },
  title: { textAlign: 'center', fontSize: 30 },

  cell: {
    width: 40,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    borderRadius: 12,
    textAlign: 'center',
    color: '#000', // text color
  },
  focusCell: {
    borderColor: '#000',
  },
});

interface prop {
  code:string
  setCode: (s: string) => void
  cellCount?:number
}
export default function CustomCodeField(p: prop) {
  return (
    <View style={styles.root}>
      <CodeField
        cellCount={p.cellCount ?? 6}
        keyboardType="number-pad"
        value={p.code}
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
        onChangeText={(code) => p.setCode(code)}
      />
    </View>

  )
}