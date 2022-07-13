import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDownComponent from '../components/dropDown';
import { ScreenNavigationProps } from '../routes';
import { DropdownItem } from '../dropDownTypes';
import { openUrlInBrowser } from '../helpers/urlOpener';

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
    margin: 5,
  },
  text: {
    paddingBottom: 24,
  },
});

type StationSelectProps = ScreenNavigationProps<'StationSelect'>;

const stationList: Array<DropdownItem> = [
  {
    name: 'Kings Cross',
    code: 'KGX',
  },
  {
    name: 'Euston',
    code: 'EUS',
  },
  {
    name: 'Canley',
    code: 'CNL',
  },
  {
    name: 'Newcastle',
    code: 'NCL',
  },
  {
    name: 'Orpington',
    code: 'ORP',
  },
];

const StationSelectScreen: React.FC<StationSelectProps> = () => {
  const [departStation, setDepartStation] = useState<string | null>(null);
  const [arriveStation, setArriveStation] = useState<string | null>(null);

  const stationSelectionIsValid = (
    departStation: string | null,
    arriveStation: string | null,
  ): boolean => {
    return (
      departStation !== null &&
      arriveStation !== null &&
      departStation !== arriveStation
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Stations</Text>
      <DropDownComponent
        items={stationList}
        label="Departure Station"
        value={departStation}
        setValue={setDepartStation}
      />
      <DropDownComponent
        items={stationList}
        label="Arrival Station"
        value={arriveStation}
        setValue={setArriveStation}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (stationSelectionIsValid(departStation, arriveStation)) {
            openUrlInBrowser(departStation, arriveStation);
          }
        }}
      >
        Submit
      </Button>
    </View>
  );
};

export default StationSelectScreen;
