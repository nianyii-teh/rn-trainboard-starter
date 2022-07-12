import React, { useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDownComponent from '../components/dropDown';
import { ScreenNavigationProps } from '../routes';
import { DropdownItem } from '../dropDownTypes';
import { urlOpenerFunc } from '../helpers/urlOpener';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    margin: 10,
  },
  dropdown: {
    margin: -10,
  },
  text: {
    paddingBottom: 24,
  },
});

type StationSelectProps = ScreenNavigationProps<'StationSelect'>;

const stList: DropdownItem[] = [
  {
    label: 'Kings Cross',
    value: 'KGX',
  },
  {
    label: 'Euston',
    value: 'EUS',
  },
  {
    label: 'Canley',
    value: 'CNL',
  },
  {
    label: 'Newcastle',
    value: 'NCL',
  },
  {
    label: 'Orpington',
    value: 'ORP',
  },
];

const StationSelectScreen: React.FC<StationSelectProps> = ({ navigation }) => {
  const [departStation, setDepartStation] = useState('');
  const [arriveStation, setArriveStation] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Stations</Text>
      <DropDownComponent
        items={stList}
        label={'Departure Station'}
        value={departStation}
        setValue={setDepartStation}
      />
      <DropDownComponent
        items={stList}
        label={'Arrival Station'}
        value={arriveStation}
        setValue={setArriveStation}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (
            departStation &&
            arriveStation &&
            departStation != arriveStation
          ) {
            urlOpenerFunc(
              `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${departStation}/${arriveStation}/#LiveDepResults`,
            );
          }
        }}
      >
        Submit
      </Button>
    </View>
  );
};

export default StationSelectScreen;
