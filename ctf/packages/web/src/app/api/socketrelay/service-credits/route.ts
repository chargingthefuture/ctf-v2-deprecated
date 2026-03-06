import { NextResponse } from 'next/server';
import { requireSocketRelayUserAccess, ensureMutationCsrf } from '../../_lib';
import { sendSocketRelayServiceCredits } from '@/src/lib/socketrelay/repository';
import { SOCKETRELAY_ERROR_CODE } from '@/src/lib/socketrelay/constants';
import type { SocketRelayServiceCreditsSendInput } from '@/src/lib/socketrelay/types';

export async function POST(request: Request) {
  const gate = await requireSocketRelayUserAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  const csrfDeny = ensureMutationCsrf(request);
  if (csrfDeny) {
    return csrfDeny;
  }

  let input: SocketRelayServiceCreditsSendInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: SOCKETRELAY_ERROR_CODE.invalidInput, message: 'Invalid JSON.' }, { status: 400 });
  }

  try {
    const tx = await sendSocketRelayServiceCredits(input, gate.userId);
    return NextResponse.json({ ok: true, transaction: tx }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, code: SOCKETRELAY_ERROR_CODE.persistenceUnavailable, message: 'Unable to send service credits.' }, { status: 503 });
  }
}
