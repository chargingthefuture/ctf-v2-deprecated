import { NextResponse } from 'next/server';
import { requireTrustTransportUserAccess, ensureMutationCsrf } from '../../_lib';
import { sendTrustTransportServiceCredits } from '@/src/lib/trusttransport/repository';
import { TRUSTTRANSPORT_ERROR_CODE } from '@/src/lib/trusttransport/constants';
import type { TrustTransportServiceCreditsSendInput } from '@/src/lib/trusttransport/types';

export async function POST(request: Request) {
  const gate = await requireTrustTransportUserAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  const csrfDeny = ensureMutationCsrf(request);
  if (csrfDeny) {
    return csrfDeny;
  }

  let input: TrustTransportServiceCreditsSendInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: TRUSTTRANSPORT_ERROR_CODE.invalidPayload, message: 'Invalid JSON.' }, { status: 400 });
  }

  try {
    const tx = await sendTrustTransportServiceCredits(input, gate.userId);
    return NextResponse.json({ ok: true, transaction: tx }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, code: TRUSTTRANSPORT_ERROR_CODE.persistenceUnavailable, message: 'Unable to send service credits.' }, { status: 503 });
  }
}
