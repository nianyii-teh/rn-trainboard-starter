import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDownComponent from '../components/dropDown';
import { ScreenNavigationProps } from '../routes';
import { DropdownItem } from '../model/dropDownItem';
import ErrorMessageComponent from '../components/errorMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  errorMessageContainer: {
    flex: 5,
  },
  body: {
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
  {
    label: 'Weymouth',
    value: 'WEY',
  },
  {
    label: 'Bridlington',
    value: 'BDT',
  },
];

const StationSelectScreen: React.FC<StationSelectProps> = ({ navigation }) => {
  const [departStationCrsCode, setDepartStationCrsCode] = useState<
    string | null
  >(null);
  const [arriveStationCrsCode, setArriveStationCrsCode] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stationSelectionIsValid = (
    departStationCrsCode: string,
    arriveStationCrsCode: string,
  ): boolean => departStationCrsCode !== arriveStationCrsCode;

  const handleButtonTap = () => {
    if (!departStationCrsCode || !arriveStationCrsCode) {
      setErrorMessage('Please select a departure and/or arrival station.');
      return;
    }

    if (stationSelectionIsValid(departStationCrsCode, arriveStationCrsCode)) {
      setErrorMessage(null);
      navigation.navigate('FareResults', {
        departStationCrsCode: departStationCrsCode,
        arriveStationCrsCode: arriveStationCrsCode,
      });
    } else {
      setErrorMessage('The departure and arrival stations cannot be the same.');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.body}>Select Stations</Text>
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
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => handleButtonTap()}>
          View Journeys
        </Button>
      </View>
      <View style={styles.errorMessageContainer}>
        {errorMessage !== null && (
          <ErrorMessageComponent message={errorMessage}></ErrorMessageComponent>
        )}
      </View>
    </View>
  );
};

export default StationSelectScreen;
