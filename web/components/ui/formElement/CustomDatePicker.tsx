// CustomDatePicker.tsx - Fixed version
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
interface CustomDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  if (Platform.OS === 'ios') {
    // iOS - always visible picker
    return (
      <View>
        <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Select Date:</Text>
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={handleChange}
          style={{ height: 200 }}
        />
      </View>
    );
  }

  // Android - show on button press
  return (
    <View>
      <TouchableOpacity 
        onPress={() => setShow(true)}
        style={{
          padding: 12,
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
        }}
      >
        <Text>{value.toLocaleDateString()}</Text>
      </TouchableOpacity>
      
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}
    </View>
  );
};