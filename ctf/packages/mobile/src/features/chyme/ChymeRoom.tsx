import React, { Fragment, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  deleteChymeProfile,
  deleteFullAccount,
  getChymeMessages,
  getChymeRoom,
  postChymeJoin,
  postChymeMessage,
  type MobileRequestIdentity,
} from './ChymeApi';

export const ChymeRoom = () => {
  const [identity, setIdentity] = useState<MobileRequestIdentity>({
    userId: '',
    username: '',
    role: 'member',
    isApproved: true,
  });
  const [room, setRoom] = useState<any | null>(null);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [joined, setJoined] = useState(false);
  const [joinChannelId, setJoinChannelId] = useState<string | null>(null);

  const ready = useMemo(() => identity.userId.trim().length > 0, [identity.userId]);

  const loadRoom = async () => {
    if (!ready) {
      Alert.alert('Identity required', 'Enter a user id before loading Chyme.');
      return;
    }

    try {
      setLoading(true);
      const [roomPayload, messagesPayload] = await Promise.all([
        getChymeRoom(identity),
        getChymeMessages(identity),
      ]);
      setRoom(roomPayload);
      setMessages(messagesPayload?.messages ?? []);
    } catch (err) {
      Alert.alert('Load failed', String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!text.trim() || !ready) return;
    try {
      const sent = await postChymeMessage(identity, text.trim());
      setMessages((prev) => [...prev, sent.message]);
      setText('');
    } catch (err) {
      Alert.alert('Send failed', String(err));
    }
  };

  const handleJoin = async () => {
    if (!ready) {
      Alert.alert('Identity required', 'Enter a user id before joining Chyme.');
      return;
    }

    try {
      const res = await postChymeJoin(identity);
      if (res?.ok) {
        setJoined(true);
        setJoinChannelId(res.streamChannelId);
        Alert.alert('Joined', `Stream channel ready: ${res.streamChannelId}`);
        await loadRoom();
      }
    } catch (err) {
      Alert.alert('Join failed', String(err));
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const payload = await deleteChymeProfile(identity);
      setMessages([]);
      setRoom((current: any) => current
        ? { ...current, participants: current.participants.filter((participant: any) => participant.userId !== identity.userId) }
        : current);
      Alert.alert('Deleted', `Chyme data ${payload.status}`);
    } catch (err) {
      Alert.alert('Delete failed', String(err));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const payload = await deleteFullAccount(identity);
      Alert.alert('Requested', `Full account deletion ${payload.status}`);
    } catch (err) {
      Alert.alert('Delete failed', String(err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chyme</Text>
      <Text style={styles.subtitle}>Social audio room with provider-neutral request identity</Text>

      <View style={styles.identityCard}>
        <Text style={styles.identityLabel}>User ID</Text>
        <TextInput
          value={identity.userId}
          onChangeText={(value) => setIdentity((current) => ({ ...current, userId: value }))}
          placeholder="user_123"
          placeholderTextColor="#6B7280"
          style={styles.input}
        />

        <Text style={styles.identityLabel}>Username</Text>
        <TextInput
          value={identity.username}
          onChangeText={(value) => setIdentity((current) => ({ ...current, username: value }))}
          placeholder="approved_user"
          placeholderTextColor="#6B7280"
          style={styles.input}
        />

        <View style={styles.identityRow}>
          <Button
            title={identity.role === 'admin' ? 'Role: admin' : 'Role: member'}
            onPress={() => setIdentity((current) => ({ ...current, role: current.role === 'admin' ? 'member' : 'admin' }))}
          />
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Approved</Text>
            <Switch
              value={identity.isApproved}
              onValueChange={(value) => setIdentity((current) => ({ ...current, isApproved: value }))}
            />
          </View>
        </View>

        <Button title="Load Room" onPress={loadRoom} disabled={!ready || loading} />
      </View>

      {room ? (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{room.roomName}</Text>
          <Text style={styles.summaryText}>Room key: {room.roomKey}</Text>
          <Text style={styles.summaryText}>Participants: {room.participants.length}</Text>
          <Text style={styles.summaryText}>Call active: {room.callActive ? 'yes' : 'no'}</Text>
          {joinChannelId ? <Text style={styles.summaryText}>Stream channel: {joinChannelId}</Text> : null}
        </View>
      ) : null}

      {room?.participants?.length ? (
        <View style={styles.participantCard}>
          <Text style={styles.sectionTitle}>Participants</Text>
          {room.participants.map((participant: any) => (
            <Fragment key={participant.userId}>
              <View style={styles.participantRow}>
                <View>
                  <Text style={styles.participantName}>{participant.displayName}</Text>
                  <Text style={styles.participantMeta}>{participant.userId}</Text>
                </View>
                <Text style={styles.participantMeta}>{participant.role}</Text>
              </View>
            </Fragment>
          ))}
        </View>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No messages yet</Text>
          <Text style={styles.emptyStateText}>
            Start the conversation by sharing your thoughts. This is a safe space for survivors.
          </Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          inverted
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.messageRow}>
              <Text style={styles.messageAuthor}>{item.sender ?? 'You'}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.controls}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Share your thoughts"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Button title="Send" onPress={handleSend} disabled={!text.trim()} />
      </View>

      <View style={styles.rowButtons}>
        <Button title={joined ? 'Joined' : 'Join Room'} onPress={handleJoin} disabled={joined} />
        <Button title="Delete Chyme Profile" onPress={handleDeleteProfile} />
        <Button title="Delete Full Account" onPress={handleDeleteAccount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingTop: 16, backgroundColor: '#021006' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 4, color: '#F0FDF4' },
  subtitle: { fontSize: 14, color: '#16A34A', marginBottom: 16 },
  identityCard: { width: '95%', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#14532d', backgroundColor: '#041a0b', marginBottom: 12 },
  identityLabel: { color: '#bbf7d0', fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: 6 },
  identityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { color: '#F0FDF4', fontSize: 13 },
  summaryCard: { width: '95%', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#14532d', backgroundColor: '#041a0b', marginBottom: 12 },
  summaryTitle: { color: '#F0FDF4', fontWeight: '700', fontSize: 16, marginBottom: 6 },
  summaryText: { color: '#bbf7d0', fontSize: 13, marginBottom: 2 },
  participantCard: { width: '95%', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#14532d', backgroundColor: '#041a0b', marginBottom: 12 },
  sectionTitle: { color: '#F0FDF4', fontWeight: '700', fontSize: 15, marginBottom: 10 },
  participantRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#052e16' },
  participantName: { color: '#F0FDF4', fontWeight: '600' },
  participantMeta: { color: '#86efac', fontSize: 12 },
  list: { width: '95%', maxHeight: 300, marginBottom: 8 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  emptyStateTitle: { fontSize: 18, fontWeight: '700', color: '#F0FDF4', marginBottom: 12, textAlign: 'center' },
  emptyStateText: { fontSize: 15, color: '#4B5563', textAlign: 'center', lineHeight: 1.6 },
  messageRow: { padding: 8, borderBottomWidth: 1, borderColor: '#052e16' },
  messageAuthor: { fontWeight: '600', color: '#22C55E' },
  messageText: { marginTop: 4, color: '#E8EAF0' },
  controls: { flexDirection: 'row', width: '95%', alignItems: 'center', marginBottom: 8, paddingHorizontal: 12 },
  input: { flex: 1, borderColor: '#052e16', borderWidth: 1, padding: 8, marginRight: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', color: '#E8EAF0' },
  rowButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '95%', paddingHorizontal: 12 },
});
