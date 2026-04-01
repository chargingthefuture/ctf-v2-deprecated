import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockSkills = [
  { id: 's1', sector: 'Technology', jobTitle: 'Frontend Engineer', skill: 'React' },
  { id: 's2', sector: 'Healthcare', jobTitle: 'Care Coordinator', skill: 'Patient Triage' },
  { id: 's3', sector: 'Education', jobTitle: 'Learning Designer', skill: 'Curriculum Mapping' },
];

export const MockSkillsTaxonomy = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills Taxonomy (mock)</Text>
      <FlatList
        data={mockSkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.skill}>{item.skill}</Text>
            <Text style={styles.meta}>{item.sector} · {item.jobTitle}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  row: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#e8e8e8' },
  skill: { fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
});
