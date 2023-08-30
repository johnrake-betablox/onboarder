"use client";

import LoadingDots from "@/components/LoadingDots";
import { getStepForm } from "@/lib/flow-step";
import { captilalize } from "@/utils/capitalize";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Flow, Step, StepAnswer } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function StepForm({
  clientInviteToken,
  flow,
  step,
  prevStep,
  nextStep,
  stepAnswer,
}: {
  clientInviteToken: string;
  flow: Flow;
  step: Step;
  prevStep: Step | null;
  nextStep: Step | null;
  stepAnswer: StepAnswer | null;
}) {
  const router = useRouter();
  const formRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setSaving(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post(`/api/stepAnswer`, {
        data: Object.fromEntries(formData),
        flowId: flow.id,
        stepId: step.id,
        clientInviteToken,
      });
      console.log(res.data);

      if (nextStep) {
        router.push(`/flows/${clientInviteToken}/steps/${nextStep!.id}`);
      } else {
        router.push(`/flows/${clientInviteToken}/complete`);
      }
    } catch (e) {
      window.alert("error");
      console.error(e);
    }
  };

  const getFieldDefaultValue = (name: string): string | undefined => {
    if (!stepAnswer) return;

    return (stepAnswer.data || {})[name];
  };

  const form = getStepForm(step);
  const fields = (form && form.fields) || [];

  return (
    <div>
      <form ref={formRef} onSubmit={onSubmit}>
        {fields.map((field) => {
          return (
            <div key={field.name}>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Write Here:
              </label>
              <div className="mt-2">
                {field.type === "text" && (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    defaultValue={getFieldDefaultValue(field.name)}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={6}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    defaultValue={getFieldDefaultValue(field.name)}
                  />
                )}
              </div>
            </div>
          );
        })}
        <div className="mt-20 flex flex-row items-center justify-between">
          {prevStep ? (
            <Link
              href={`/flows/${clientInviteToken}/steps/${prevStep.id}`}
              className="button button-default"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <div />
          )}
          {nextStep ? (
            <button type="submit" className="button button-primary">
              {saving ? <LoadingDots color="white" /> : "Next"}
              <ArrowRightIcon className="h-4 w-4 text-white" />
            </button>
          ) : (
            <button type="submit" className="button button-success">
              Complete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
