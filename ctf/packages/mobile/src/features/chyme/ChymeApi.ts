// Chyme API client for Android parity
// This is a placeholder. Replace fetch URLs with your actual API endpoints.

export async function getChymeRoom(token: string) {
  const res = await fetch('/api/chyme/room', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch Chyme room');
  return res.json();
}

export async function getChymeMessages(token: string) {
  const res = await fetch('/api/chyme/messages', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch Chyme messages');
  return res.json();
}

export async function postChymeMessage(token: string, text: string) {
  const res = await fetch('/api/chyme/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function postChymeJoin(token: string) {
  const res = await fetch('/api/chyme/join', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to join Chyme room');
  return res.json();
}

export async function deleteChymeProfile(token: string) {
  const res = await fetch('/api/account/chyme-profile', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete Chyme profile');
  return res.json();
}

export async function deleteFullAccount(token: string) {
  const res = await fetch('/api/account/full-account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete full account');
  return res.json();
}
