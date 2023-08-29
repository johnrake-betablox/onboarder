import { Step } from "@prisma/client";

export const DEFAULT_STEP_FORM_JSON = {
  fields: [],
};

type StepFormField = {
  type: string;
  name: string;
};
type StepForm = {
  fields: StepFormField[];
};
export function getStepForm(step?: Step): StepForm {
  if (!step) {
    return DEFAULT_STEP_FORM_JSON;
  }

  return step.form as StepForm;
}
