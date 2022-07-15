import React from 'react';
import { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Journey } from '../model/fareResponseClass';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    minWidth: '90%',
  },
  body: {
    fontSize: 14,
    color: '#000',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

type FlatListProps = {
  items: Journey[];
};

const convertIsoDateTimeToFormattedDate = (isoDateString: string): string => {
  const isoDate: Date = new Date(isoDateString);
  const date: string = isoDate.toDateString();

  return date;
};

const convertIsoDateTimeToFormattedTime = (isoDateString: string): string => {
  const isoDate: Date = new Date(isoDateString);
  const hour: number = isoDate.getHours();
  const minute: number = isoDate.getMinutes();
  const dateString = `${hour}:${minute}`;

  return dateString;
};

const FlatListComponent: React.FC<FlatListProps> = ({ items }) => {
  const renderItem: ListRenderItem<Journey> = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text>{convertIsoDateTimeToFormattedDate(item.departureTime)}</Text>
      </View>
      <View style={styles.columnContainer}>
        <View>
          <Text style={styles.heading}>
            {convertIsoDateTimeToFormattedTime(item.departureTime)}
          </Text>
          <Text style={styles.body}>{item.originStation.displayName}</Text>
        </View>
        <View>
          <Text style={styles.heading}>{'\u2192'}</Text>
        </View>
        <View>
          <Text style={styles.heading}>
            {convertIsoDateTimeToFormattedTime(item.arrivalTime)}
          </Text>
          <Text style={styles.body}>{item.destinationStation.displayName}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.journeyId}
      />
    </SafeAreaView>
  );
};

export default FlatListComponent;
