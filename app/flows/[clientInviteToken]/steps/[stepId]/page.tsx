import StepCategoryProgress from "@/components/StepCategoryProgress";
import prisma from "@/lib/prisma";
import { Step, StepAnswer } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import StepForm from "./StepForm";
import { getFlowCategoryProgress } from "@/lib/flow";

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

async function fetchStepAnswer(
  step: Step,
  clientInviteToken: string,
): Promise<StepAnswer | null> {
  const clientInvite = await prisma.clientInvite.findFirstOrThrow({
    where: { token: clientInviteToken },
  });

  return await prisma.stepAnswer.findUnique({
    where: {
      flowId_stepId_clientInviteId: {
        flowId: step.flowId,
        stepId: step.id,
        clientInviteId: clientInvite.id,
      },
    },
  });
}

export default async function StepPage({
  params,
}: {
  params: { clientInviteToken: string; stepId: string };
}) {
  const flow = await fetchFlow(params.clientInviteToken);

  const currentStepIndex = flow.Steps.findIndex(
    (s) => s.id === Number(params.stepId),
  );
  const currentStep = flow.Steps[currentStepIndex];
  const prevStep = flow.Steps[currentStepIndex - 1];
  const nextStep = flow.Steps[currentStepIndex + 1];

  const stepAnswer = await fetchStepAnswer(
    currentStep,
    params.clientInviteToken,
  );

  const progress = await getFlowCategoryProgress(flow, currentStep);

  return (
    <>
      <StepCategoryProgress items={progress} />
      <div className="mx-auto mt-20 max-w-3xl">
        <h1 className="mb-4 text-3xl font-extrabold">{currentStep.title}</h1>
        <div className="prose mb-10 max-w-none">
          <ReactMarkdown>{String(currentStep.content)}</ReactMarkdown>
        </div>
        <StepForm
          flow={flow}
          clientInviteToken={params.clientInviteToken}
          step={currentStep}
          prevStep={prevStep}
          nextStep={nextStep}
          stepAnswer={stepAnswer}
        />
      </div>
    </>
  );
}
