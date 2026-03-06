import { NextResponse } from 'next/server';
import { requireLighthouseUserAccess, ensureMutationCsrf } from '../../_lib';
import { sendLighthouseServiceCredits } from '@/src/lib/lighthouse/repository';
import { LIGHTHOUSE_ERROR_CODE } from '@/src/lib/lighthouse/constants';
import type { LighthouseServiceCreditsSendInput } from '@/src/lib/lighthouse/types';

export async function POST(request: Request) {
  const gate = await requireLighthouseUserAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  const csrfDeny = ensureMutationCsrf(request);
  if (csrfDeny) {
    return csrfDeny;
  }

  let input: LighthouseServiceCreditsSendInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: LIGHTHOUSE_ERROR_CODE.invalidInput, message: 'Invalid JSON.' }, { status: 400 });
  }

  try {
    const tx = await sendLighthouseServiceCredits(input, gate.userId);
    return NextResponse.json({ ok: true, transaction: tx }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, code: LIGHTHOUSE_ERROR_CODE.persistenceUnavailable, message: 'Unable to send service credits.' }, { status: 503 });
  }
}
