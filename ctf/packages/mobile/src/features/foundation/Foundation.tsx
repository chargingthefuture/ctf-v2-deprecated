import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Foundation = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Foundation</Text>
    {/* TODO: Implement real mobile UI and connect to backend */}
    <Text>Production Foundation mobile feature coming soon.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
});
