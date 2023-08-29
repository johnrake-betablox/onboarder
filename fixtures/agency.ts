import prisma from "@/lib/prisma";
import { Agency } from "@prisma/client";

export async function createAgency(): Promise<Agency> {
  return await prisma.agency.create({
    data: {
      name: "BuildingBlox",
    },
  });
}
