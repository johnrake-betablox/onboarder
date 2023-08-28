import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createHarryPotterUser(): Promise<User> {
  return await prisma.user.create({
    data: {
      firstName: "Harry",
      lastName: "Potter",
      email: "harry@hogwarts.io",
      phone: "123-456-7890",
      password: "password",
    },
  });
}
