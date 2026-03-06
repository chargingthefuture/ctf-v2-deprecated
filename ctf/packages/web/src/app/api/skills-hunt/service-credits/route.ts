import { NextResponse } from 'next/server';
import { requireSkillsHuntUserAccess, ensureMutationCsrf } from '../../_lib';
import { sendSkillsHuntServiceCredits } from '@/src/lib/skills-hunt/repository';
import { SKILLS_HUNT_ERROR_CODE } from '@/src/lib/skills-hunt/constants';
import type { SkillsHuntServiceCreditsSendInput } from '@/src/lib/skills-hunt/types';

export async function POST(request: Request) {
  const gate = await requireSkillsHuntUserAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  const csrfDeny = ensureMutationCsrf(request);
  if (csrfDeny) {
    return csrfDeny;
  }

  let input: SkillsHuntServiceCreditsSendInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: SKILLS_HUNT_ERROR_CODE.invalidInput, message: 'Invalid JSON.' }, { status: 400 });
  }

  try {
    const tx = await sendSkillsHuntServiceCredits(input, gate.userId);
    return NextResponse.json({ ok: true, transaction: tx }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, code: SKILLS_HUNT_ERROR_CODE.persistenceUnavailable, message: 'Unable to send service credits.' }, { status: 503 });
  }
}
