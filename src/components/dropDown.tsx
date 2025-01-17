import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { DropdownItem } from '../model/dropDownItem';

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
  safeContainerStyle: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    minWidth: '70%',
  },
});

type DropdownProps = {
  items: DropdownItem[];
  label: string;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

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
