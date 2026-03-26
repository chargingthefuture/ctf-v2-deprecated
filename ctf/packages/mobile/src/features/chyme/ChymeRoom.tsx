import React, { useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
// import { getChymeRoom, postChymeJoin } from './ChymeApi'; // Uncomment and implement auth/token

// Placeholder participant data
const mockParticipants = [
  { id: '1', username: 'alice', role: 'speaker' },
  { id: '2', username: 'bob', role: 'listener' },
];

export const ChymeRoom = () => {
  // const [participants, setParticipants] = useState([]);
  // const [loading, setLoading] = useState(false);
  // TODO: Wire up API and auth
  const [participants] = useState(mockParticipants);
  const [loading] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Chyme Room</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={participants}
          keyExtractor={item => item.id}
          style={{ width: '90%', marginBottom: 16 }}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
              <Text>{item.username} ({item.role})</Text>
            </View>
          )}
        />
      )}
      <Button title="Join Room" onPress={() => {}} />
      <Button title="Open Chat" onPress={() => {}} />
      <Button title="Delete Chyme Profile" onPress={() => {}} />
    </View>
  );
};
