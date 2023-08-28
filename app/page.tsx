import Link from "next/link";
import prisma from "@/lib/prisma";

async function fetchFlow() {
  return await prisma.flow.findFirstOrThrow({
    include: {
      Steps: true,
    },
  });
}

export default async function Home() {
  const flow = await fetchFlow();

  return (
    <div>
      <h1>Home!</h1>
      <Link href={`/flows/${flow.id}`} className="button-primary">
        Start
      </Link>
    </div>
  );
}
