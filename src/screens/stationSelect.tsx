import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDownComponent from '../components/dropDown';
import { ScreenNavigationProps } from '../routes';
import { DropdownItem } from '../model/dropDownItem';
import ErrorMessageComponent from '../components/errorMessage';
import { StationNameResponse, Station } from '../model/stationNameList';
import { config } from '../config';
import { useEffect } from 'react';
import { mapStationDataToDropdownItem } from '../helpers/stationDataToDropdownItemMapper';

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

const getStationNames = async (): Promise<StationNameResponse> => {
  const response: Response = await fetch(`${config.baseURL}/v1/stations`, {
    method: 'GET',
    headers: {
      'x-api-key': config.apiKey,
    },
  });

  return (await response.json()) as StationNameResponse;
};

const StationSelectScreen: React.FC<StationSelectProps> = ({ navigation }) => {
  const [departStationCrsCode, setDepartStationCrsCode] = useState<
    string | null
  >(null);
  const [arriveStationCrsCode, setArriveStationCrsCode] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stationList, setStationList] = useState<DropdownItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const getStationNamesResult = await getStationNames();
      setStationList(
        mapStationDataToDropdownItem(getStationNamesResult.stations),
      );
    };

    fetchData().catch(console.error);
  }, []);

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
      {stationList ? (
        <>
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
        </>
      ) : (
        <Text>Waiting for stations</Text>
      )}

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
