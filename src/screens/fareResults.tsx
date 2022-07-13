import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});

type FareResultsProps = ScreenNavigationProps<'FareResults'>;

const DATA = [
  {
    journeyId: 'placeholderId1',
    title: 'First Item',
  },
  {
    journeyId: 'placeholderId2',
    title: 'Second Item',
  },
  {
    journeyId: 'placeholderId3',
    title: 'Third Item',
  },
];

const getTrainFares = async (departStation: string, arriveStation: string) => {
  const response: unknown = await fetch(
    `${config.baseURL}/v1/fares?originStation=${departStation}&destinationStation=${arriveStation}&outboundDateTime=2022-07-14T12:16:27.371&numberOfChildren=0&numberOfAdults=1`,
    {
      method: 'GET',
      headers: {
        'x-api-key': config.apiKey,
      },
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.outboundJourneys[0].departureTime);
      console.log(data.outboundJourneys[0].destinationStation.displayName);
      return data.outboundJourneys;
    })

    .catch((err) => console.error(err));
};

const FareResultsScreen: React.FC<FareResultsProps> = () => {
  return <></>;
};

export default FareResultsScreen;
