import { Flow, Step } from "@prisma/client";
import prisma from "@/lib/prisma";

export enum StepCategoryStatus {
  complete = "complete",
  current = "current",
  upcoming = "upcoming",
}

export type StepCategoryProgress = {
  id: string;
  name: string;
  status: StepCategoryStatus;
  totalStepsCount: number;
};

export async function getFlowCategoryProgress(
  flow: Flow,
  currentStep: Step,
): Promise<StepCategoryProgress[]> {
  const steps = await prisma.step.findMany({
    where: {
      flowId: flow.id,
    },
  });

  const categories = steps.map((step) => step.category);
  const uniqCategories = categories.filter(
    (category, index) => categories.indexOf(category) === index,
  );
  return uniqCategories.map((category, index) => ({
    id: `0${index + 1}`,
    name: category,
    status: getStepCategoryStatus(currentStep, category, uniqCategories),
    totalStepsCount: steps.filter((step) => step.category === category).length,
  }));
}

function getStepCategoryStatus(
  currentStep: Step,
  category: string,
  categories: string[],
): StepCategoryStatus {
  const currentStepIndex = categories.indexOf(currentStep.category);
  const categoryIndex = categories.indexOf(category);

  if (currentStepIndex > categoryIndex) {
    return StepCategoryStatus.complete;
  } else if (currentStepIndex === categoryIndex) {
    return StepCategoryStatus.current;
  } else {
    return StepCategoryStatus.upcoming;
  }
}
