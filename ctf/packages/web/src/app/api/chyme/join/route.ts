import { NextResponse } from 'next/server';
import { CHYME_ERROR_CODE } from '@/src/lib/chyme/constants';
import { createStreamJoinCredentials } from '@/src/lib/chyme/stream';
import { getRoomState } from '@/src/lib/chyme/repository';
import { logChymeAudit } from '@/src/lib/chyme/audit';
import { requireChymeAccess } from '../_lib';

export async function POST() {
  const gate = await requireChymeAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  try {
    const room = await getRoomState(gate.identity);
    const credentials = await createStreamJoinCredentials(gate.auth.userId, gate.identity.displayName);

    if (!credentials) {
      logChymeAudit({
        pluginId: 'chyme',
        command: 'chyme.call.join',
        actorId: gate.auth.userId,
        status: 'deny',
        reason: 'stream_not_configured',
        target: {
          roomId: room.roomId,
          roomKey: room.roomKey,
        },
        result: 'failure',
        errorCategory: 'service_unavailable',
      });

      return NextResponse.json(
        {
          ok: false,
          code: CHYME_ERROR_CODE.streamUnavailable,
          message: 'Stream service is not configured.',
        },
        { status: 503 },
      );
    }

    logChymeAudit({
      pluginId: 'chyme',
      command: 'chyme.call.join',
      actorId: gate.auth.userId,
      status: 'allow',
      reason: 'approved_user_or_admin',
      target: {
        roomId: room.roomId,
        roomKey: room.roomKey,
        streamChannelId: credentials.streamChannelId,
      },
      result: 'success',
      errorCategory: null,
    });

    return NextResponse.json(
      {
        ok: true,
        roomId: room.roomId,
        roomKey: room.roomKey,
        ...credentials,
      },
      { status: 200 },
    );
  } catch {
    logChymeAudit({
      pluginId: 'chyme',
      command: 'chyme.call.join',
      actorId: gate.auth.userId,
      status: 'allow',
      reason: 'approved_user_or_admin',
      target: {},
      result: 'failure',
      errorCategory: 'internal_error',
    });

    return NextResponse.json(
      {
        ok: false,
        code: CHYME_ERROR_CODE.internalError,
        message: 'Unable to join Chyme call.',
      },
      { status: 500 },
    );
  }
}
