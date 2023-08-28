import Steps from "@/components/Steps";
import prisma from "@/lib/prisma";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function fetchStep() {
  return await prisma.step.findMany();
}

export default async function Start() {
  const steps = await fetchStep();

  return (
    <>
      <Steps />
      <div className="mx-auto mt-20 max-w-3xl">
        <h1 className="mb-4 text-3xl font-extrabold">Start Page</h1>
        <div className="flex flex-row items-center justify-between">
          <div></div>
          <Link href={`/steps/${steps[0].id}`} className="button-primary">
            Next
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </Link>
        </div>
      </div>
    </>
  );
}
