import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native';
import { Journey } from '../model/fareResponseClass';
import { FlatListItem } from '../model/flatListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 14,
  },
});

type FlatListProps = {
  items: Journey[] | null;
};

const FlatListComponent: React.FC<FlatListProps> = ({ items }) => {
  const renderItem: ListRenderItem<Journey> = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.originStation.displayName}</Text>
        <Text style={styles.title}>{item.destinationStation.displayName}</Text>
        <Text style={styles.title}>{item.departureTime}</Text>
        <Text style={styles.title}>{item.arrivalTime}</Text>
      </View>
    );
  };

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
