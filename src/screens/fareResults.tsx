import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import FlatListComponent from '../components/flatList';
import { useEffect } from 'react';
import { FareResponse, Journey } from '../model/fareResponseClass';

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
  departStation: string,
  arriveStation: string,
): Promise<FareResponse> => {
  const response: Response = await fetch(
    `${config.baseURL}/v1/fares?originStation=${departStation}&destinationStation=${arriveStation}&outboundDateTime=2022-07-14T12:16:27.371&numberOfChildren=0&numberOfAdults=1`,
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
  const { departStation, arriveStation } = route.params;

  const [fareResponseData, setFareResponseData] = useState<Journey[] | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const getTrainFaresResult = await getTrainFares(
        departStation as string,
        arriveStation as string,
      );

      if (isMounted) {
        setFareResponseData(getTrainFaresResult.outboundJourneys);
      }
    };

    fetchData().catch(console.error);
    return () => {
      isMounted = false;
    };
  });

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
