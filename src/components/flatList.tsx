import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native';

type FlatListProps = {
  items: FlatListItem[];
};

const TrainItem = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FlatListComponent: React.FC<FlatListProps> = ({ items }) => {
  const renderItem = ({ item }) => <TrainItem title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

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

export default FlatListComponent;
