import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDownComponent from '../components/dropDown';
import { ScreenNavigationProps } from '../routes';
import { DropdownItem } from '../model/dropDownItem';

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
    padding: 16,
    fontSize: 18,
  },
});

type StationSelectProps = ScreenNavigationProps<'StationSelect'>;

const stationList: Array<DropdownItem> = [
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
  const [departStationCrsCode, setDepartStationCrsCode] = useState<
    string | null
  >(null);
  const [arriveStationCrsCode, setArriveStationCrsCode] = useState<
    string | null
  >(null);

  const stationSelectionIsValid = (
    departStationCrsCode: string,
    arriveStationCrsCode: string,
  ): boolean => departStationCrsCode !== arriveStationCrsCode;

  const handleButtonTap = () => {
    if (!departStationCrsCode || !arriveStationCrsCode) {
      // TODO stretch goals: add some error messaging here
      return;
    }

    if (stationSelectionIsValid(departStationCrsCode, arriveStationCrsCode)) {
      navigation.navigate('FareResults', {
        departStationCrsCode: departStationCrsCode,
        arriveStationCrsCode: arriveStationCrsCode,
      });
    } else {
      // TODO stretch goals: add some error messaging here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Stations</Text>
      <DropDownComponent
        items={stationList}
        label="Departure Station"
        value={departStationCrsCode}
        setValue={setDepartStationCrsCode}
      />
      <DropDownComponent
        items={stationList}
        label="Arrival Station"
        value={arriveStationCrsCode}
        setValue={setArriveStationCrsCode}
      />
      <Button mode="contained" onPress={() => handleButtonTap()}>
        Submit
      </Button>
    </View>
  );
};

export default StationSelectScreen;
