import { NextResponse } from "next/server";
import { upsertAccessUserFromClerk } from "../../../../lib/server/accessRepository";
import { getClerkServerModule } from "../../../../lib/server/clerkServer";
import { resolveClerkRuntimeConfig } from "../../../../lib/server/clerkHostConfig";

export async function GET(request: Request) {
  try {
    const { auth, currentUser } = await getClerkServerModule(request);
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;

    const accessUser = await upsertAccessUserFromClerk({
      userId,
      email,
      firstName: clerkUser?.firstName ?? null,
      lastName: clerkUser?.lastName ?? null,
      profileImageUrl: clerkUser?.imageUrl ?? null,
    });

    return NextResponse.json(accessUser);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load access status.";
    const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    let clerkRuntime: ReturnType<typeof resolveClerkRuntimeConfig> | null = null;

    try {
      clerkRuntime = resolveClerkRuntimeConfig(request.headers);
    } catch {
      clerkRuntime = null;
    }

    console.error("[access-status]", {
      message,
      host: requestHost,
      clerkHost: clerkRuntime?.host,
      publishableKeyEnv: clerkRuntime?.publishableKeyEnv,
      secretKeyEnv: clerkRuntime?.secretKeyEnv,
      signInUrlEnv: clerkRuntime?.signInUrlEnv,
    });

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
