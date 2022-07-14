import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  body: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

type ErrorMessageProps = {
  message: string;
};

const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.body}>{message}</Text>
    </View>
  );
};

export default ErrorMessageComponent;
