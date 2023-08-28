import Steps from "@/components/Steps";
import prisma from "@/lib/prisma";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

async function fetchStep(id: string) {
  return await prisma.step.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });
}

export default async function StepPage({ params }: { params: { id: string } }) {
  const step = await fetchStep(params.id);
  return (
    <>
      <Steps />
      <div className="mx-auto mt-20 max-w-3xl">
        <h1 className="mb-4 text-3xl font-extrabold">{step.title}</h1>
        <div className="prose mb-10 max-w-none">
          <ReactMarkdown>{step.content}</ReactMarkdown>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div></div>
          <Link href="#" className="button-primary">
            Next
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </Link>
        </div>
      </div>
    </>
  );
}
