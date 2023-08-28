import { Address, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import moment from "moment";
import { IsUnderAgeError } from "@/config/errors";
import { setCartSubtotals } from "./cart";

// Exclude keys from user
function exclude<User, Key extends keyof User>(user: User, keys: Key[]) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

export async function getUserOrThrow(): Promise<User> {
  const session = await getServerSession();
  const email = session?.user?.email as string;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });
  return exclude(user, ["password"]) as User;
}

export function validateAge(day: string, month: string, year: string): boolean {
  const birthDate = moment()
    .set("day", parseInt(day))
    .set("month", parseInt(month))
    .set("year", parseInt(year));

  const isOver21 = moment().diff(birthDate, "years") > 21;

  if (isOver21) {
    return true;
  }

  throw new IsUnderAgeError();
}

export function isMedicalCardHolder(user: User): boolean {
  return !!user.medicalCardNumber;
}

export async function updateProfile(user: User, updates: object) {
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: updates,
  });

  // Also update cart subtotals in case user changes their medical card holding status
  await setCartSubtotals(updatedUser);
}
