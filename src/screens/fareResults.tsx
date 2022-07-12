import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});

type FareResultsProps = ScreenNavigationProps<'FareResults'>;

const getTrainFares = async (departStation: string, arriveStation: string) => {
  try {
    const response = await fetch(
      `${config.baseURL}/v1/fares?originStation=${departStation}&destinationStation=${arriveStation}&outboundDateTime=2022-07-14T12:16:27.371&numberOfChildren=0&numberOfAdults=1`,
      {
        method: 'GET',
        headers: {
          'x-api-key': config.apiKey,
        },
      },
    );
    const json = await response.json();
    return json.outboundJourneys;
  } catch (error) {
    console.error(error);
  }
};

const FareResultsScreen: React.FC<FareResultsProps> = () => {
  return <>{console.log(getTrainFares('EUS', 'CNL'))}</>;
};

export default FareResultsScreen;
