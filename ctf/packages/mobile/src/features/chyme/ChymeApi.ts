type MobileRequestIdentity = {
  userId: string;
  username: string;
  role: 'member' | 'admin';
  isApproved: boolean;
};

type ChymeParticipant = {
  userId: string;
  username: string | null;
  displayName: string;
  role: 'speaker' | 'listener';
};

type ChymeRoomResponse = {
  roomId: string;
  roomName: string;
  roomKey: string;
  callActive: boolean;
  participants: ChymeParticipant[];
};

type ChymeMessagesResponse = {
  roomKey: string;
  messages: Array<{
    id: string;
    userId: string;
    displayName: string;
    text: string;
    sentAtIso: string;
  }>;
};

type ChymeSendResponse = {
  ok: true;
  message: {
    id: string;
    userId: string;
    displayName: string;
    text: string;
    sentAtIso: string;
  };
};

type ChymeJoinResponse = {
  ok: true;
  streamChannelId: string;
};

type ChymeDeletionResponse = {
  ok: true;
  status: 'requested' | 'processing' | 'completed' | 'failed';
};

declare const process: any;

const MOBILE_BASE = process?.env?.MOBILE_APP_URL || '';

function getBaseUrl(): string {
  if (typeof MOBILE_BASE === 'string' && MOBILE_BASE.trim().length > 0) {
    return MOBILE_BASE.trim().replace(/\/$/, '');
  }

  throw new Error('MOBILE_APP_URL is required for Chyme mobile parity.');
}

function buildIdentityHeaders(identity: MobileRequestIdentity): HeadersInit {
  return {
    'x-ctf-authenticated': 'true',
    'x-ctf-auth-provider': 'mobile-provider-neutral',
    'x-ctf-user-id': identity.userId,
    'x-ctf-username': identity.username,
    'x-ctf-user-role': identity.role,
    'x-ctf-user-approved': identity.isApproved ? 'approved' : 'denied',
  };
}

async function fetchJson<T>(path: string, identity: MobileRequestIdentity, options?: RequestInit): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: {
      ...buildIdentityHeaders(identity),
      ...(options?.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string'
      ? payload.message
      : `Network request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export async function getChymeRoom(identity: MobileRequestIdentity): Promise<ChymeRoomResponse> {
  return fetchJson('/api/chyme/room', identity);
}

export async function getChymeMessages(identity: MobileRequestIdentity): Promise<ChymeMessagesResponse> {
  return fetchJson('/api/chyme/messages?limit=50', identity);
}

export async function postChymeMessage(identity: MobileRequestIdentity, text: string): Promise<ChymeSendResponse> {
  return fetchJson('/api/chyme/messages', identity, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
}

export async function postChymeJoin(identity: MobileRequestIdentity): Promise<ChymeJoinResponse> {
  return fetchJson('/api/chyme/join', identity, { method: 'POST' });
}

export async function deleteChymeProfile(identity: MobileRequestIdentity): Promise<ChymeDeletionResponse> {
  return fetchJson('/api/account/chyme-profile', identity, { method: 'DELETE' });
}

export async function deleteFullAccount(identity: MobileRequestIdentity): Promise<ChymeDeletionResponse> {
  return fetchJson('/api/account/full-account', identity, { method: 'DELETE' });
}

export type { MobileRequestIdentity };
