import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import { FlatListItem } from '../model/flatListItem';
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
  departStation: string | null,
  arriveStation: string | null,
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

const FareResultsScreen: React.FC<FareResultsProps> = ({
  route,
  navigation,
}) => {
  const { departStation, arriveStation } = route.params;

  // Things to do:
  //   1. Create a response class in a models/ directory for what you expect your API response to look like
  //   2. Write the function that uses fetch to get the response using async/await syntax only, and make sure it returns a Promise<x> where x is your response model class
  //   3. Set up useEffect and useState in your component to make the API call and rerender once it's complete
  //   4. Add your flatlist component and make it only render once you've received the data

  const [fareResponseData, setFareResponseData] = useState<Journey[] | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      const getTrainFaresResult = await getTrainFares(
        departStation,
        arriveStation,
      );
      setFareResponseData(getTrainFaresResult.outboundJourneys);
    };

    fetchData().catch(console.error);
  }, []);

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
