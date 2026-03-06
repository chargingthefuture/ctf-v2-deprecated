import { NextResponse } from 'next/server';
import { requireFoundationUserAccess, ensureMutationCsrf } from '../../_lib';
import { sendFoundationServiceCredits } from '@/src/lib/foundation/repository';
import { FOUNDATION_ERROR_CODE } from '@/src/lib/foundation/constants';
import type { FoundationServiceCreditsSendInput } from '@/src/lib/foundation/types';

export async function POST(request: Request) {
  const gate = await requireFoundationUserAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  const csrfDeny = ensureMutationCsrf(request);
  if (csrfDeny) {
    return csrfDeny;
  }

  let input: FoundationServiceCreditsSendInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: FOUNDATION_ERROR_CODE.invalidInput, message: 'Invalid JSON.' }, { status: 400 });
  }

  try {
    const tx = await sendFoundationServiceCredits(input, gate.userId);
    return NextResponse.json({ ok: true, transaction: tx }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, code: FOUNDATION_ERROR_CODE.persistenceUnavailable, message: 'Unable to send service credits.' }, { status: 503 });
  }
}
