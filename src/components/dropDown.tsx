import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { DropdownProps } from '../dropDownTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    minWidth: '70%',
  },
});

const DropDownComponent: React.FC<DropdownProps> = ({
  items,
  label,
  value,
  setValue,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <DropDown
          label={label}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={value}
          setValue={setValue}
          list={items}
        />
      </SafeAreaView>
    </View>
  );
};

export default DropDownComponent;
