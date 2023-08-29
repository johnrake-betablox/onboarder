import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { data, flowId, stepId, clientInviteToken } = await request.json();
  const clientInvite = await prisma.clientInvite.findFirstOrThrow({
    where: { token: clientInviteToken },
  });

  const stepAnswer = await prisma.stepAnswer.upsert({
    where: {
      flowId_stepId_clientInviteId: {
        flowId,
        stepId,
        clientInviteId: clientInvite.id,
      },
    },
    update: {
      data,
    },
    create: {
      data,
      flowId,
      stepId,
      clientInviteId: clientInvite.id,
    },
  });

  return NextResponse.json(stepAnswer);
}
