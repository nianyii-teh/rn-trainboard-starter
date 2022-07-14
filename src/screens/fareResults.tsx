import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import FlatListComponent from '../components/flatList';
import { useEffect } from 'react';
import { FareResponse, Journey } from '../model/fareResponseClass';
import { buildGetFaresApiString } from '../helpers/apiStringBuilder';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  text: {
    paddingBottom: 24,
  },
});

type FareResultsProps = ScreenNavigationProps<'FareResults'>;

const getTrainFares = async (
  departStationCrsCode: string,
  arriveStationCrsCode: string,
): Promise<FareResponse> => {
  const response: Response = await fetch(
    buildGetFaresApiString(departStationCrsCode, arriveStationCrsCode),
    {
      method: 'GET',
      headers: {
        'x-api-key': config.apiKey,
      },
    },
  );

  return (await response.json()) as FareResponse;
};

const FareResultsScreen: React.FC<FareResultsProps> = ({ route }) => {
  const { departStationCrsCode, arriveStationCrsCode } = route.params;

  const [fareResponseData, setFareResponseData] = useState<Journey[] | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      const getTrainFaresResult = await getTrainFares(
        departStationCrsCode,
        arriveStationCrsCode,
      );

      setFareResponseData(getTrainFaresResult.outboundJourneys);
    };

    fetchData().catch(console.error);
  }, [departStationCrsCode, arriveStationCrsCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Stations</Text>
      {fareResponseData ? (
        <FlatListComponent items={fareResponseData} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default FareResultsScreen;
