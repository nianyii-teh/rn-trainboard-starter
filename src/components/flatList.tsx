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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

type FlatListProps = {
  items: Journey[] | null;
};

// const TrainItem = (
//   departStation: string,
//   arriveStation: string,
//   departureTime: Date,
//   arriveTime: Date,
// ) => {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{departStation}</Text>
//       <Text style={styles.title}>{arriveStation}</Text>
//       <Text style={styles.title}>{departureTime}</Text>
//       <Text style={styles.title}>{arriveTime}</Text>
//     </View>
//   );
// };

const FlatListComponent: React.FC<FlatListProps> = ({ items }) => {
  const renderItem: ListRenderItem<Journey> = ({ item }) => {
    return (
    //   <TrainItem
    //     departStation={item.departStation}
    //     arriveStation={item.arriveStation}
    //     departureTime={item.departureTime}
    //     arriveTime={item.arriveTime}
    //   />
    <View style={styles.item}>
      <Text style={styles.title}>{item.originStation}</Text>
      <Text style={styles.title}>{item.destinationStation}</Text>
      <Text style={styles.title}>{item.departureTime}</Text>
      <Text style={styles.title}>{item.arrivalTime}</Text>
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.journeyId}
      />
    </SafeAreaView>
  );
};

export default FlatListComponent;
