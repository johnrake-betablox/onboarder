import prisma from "@/lib/prisma";
import { ClientInvite, Flow, Step, StepAnswer } from "@prisma/client";
import ReactMarkdown from "react-markdown";

async function fetchClientInvite(clientInviteToken: string) {
  return await prisma.clientInvite.findFirstOrThrow({
    where: { token: clientInviteToken },
  });
}

async function fetchFlow(clientInvite: ClientInvite) {
  return await prisma.flow.findFirstOrThrow({
    where: {
      id: clientInvite.flowId,
    },
    include: {
      Steps: true,
    },
  });
}

async function fetchStepAnswers(
  flow: Flow,
  clientInvite: ClientInvite,
): Promise<StepAnswer[]> {
  return await prisma.stepAnswer.findMany({
    where: {
      flowId: flow.id,
      clientInviteId: clientInvite.id,
    },
  });
}

export default async function FlowExport({
  params,
}: {
  params: { clientInviteToken: string };
}) {
  const clientInvite = await fetchClientInvite(params.clientInviteToken);
  const flow = await fetchFlow(clientInvite);
  const answers = await fetchStepAnswers(flow, clientInvite);

  const getStepAnswerText = (step: Step) => {
    const answer = answers.find((a) => a.stepId === step.id) || { data: {} };
    const data = answer.data || {};

    const keys = Object.keys(data);

    if (keys.length === 1) {
      return data[keys[0]];
    }

    return "";
  };

  const { Steps } = flow;

  return (
    <div className="mx-auto mt-20 max-w-3xl">
      <h1 className="mb-4 text-3xl font-extrabold">
        {clientInvite.firstName} {clientInvite.lastName}
      </h1>
      <dl className="divide-y divide-gray-100">
        <div className="flex flex-row gap-x-2 py-2">
          <dt className="text-gray-900">Email:</dt>
          <dd className="text-gray-700 sm:col-span-2 sm:mt-0">
            {clientInvite.email}
          </dd>
        </div>
        <div className="flex flex-row gap-x-2 py-2">
          <dt className="text-gray-900">Phone:</dt>
          <dd className="text-gray-700 sm:col-span-2 sm:mt-0">
            {clientInvite.phone}
          </dd>
        </div>
      </dl>
      <div className="mb-10 mt-20 max-w-none divide-y">
        {Steps.map((step) => (
          <div key={step.id} className="py-6">
            <h3 className="mb-4 font-bold">{step.title}</h3>
            <div className="prose">
              <ReactMarkdown>{getStepAnswerText(step)}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
