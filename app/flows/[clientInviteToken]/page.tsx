import Steps from "@/components/Steps";
import prisma from "@/lib/prisma";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function fetchFlow(clientInviteToken: string) {
  const clientInvite = await prisma.clientInvite.findFirstOrThrow({
    where: { token: clientInviteToken },
  });
  return await prisma.flow.findFirstOrThrow({
    where: {
      id: clientInvite.flowId,
    },
    include: {
      Steps: true,
    },
  });
}

export default async function FlowPage({
  params,
}: {
  params: { clientInviteToken: string };
}) {
  const flow = await fetchFlow(params.clientInviteToken);

  return (
    <>
      <Steps />
      <div className="mx-auto mt-20 max-w-3xl">
        <h1 className="mb-4 text-3xl font-extrabold">Flow Page</h1>
        <div className="flex flex-row items-center justify-between">
          <div></div>
          <Link
            href={`/flows/${params.clientInviteToken}/steps/${flow.Steps[0].id}`}
            className="button-primary"
          >
            Next
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </Link>
        </div>
      </div>
    </>
  );
}
