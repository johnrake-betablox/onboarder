import { Agency, ClientInvite, Flow, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import crypto from "crypto";

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

export async function sendClientInvite(
  agency: Agency,
  flow: Flow,
  data: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  },
): Promise<ClientInvite> {
  const token = crypto.randomBytes(32).toString("hex");

  const invite = await prisma.clientInvite.create({
    data: {
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      agencyId: agency.id,
      flowId: flow.id,
      token,
    },
  });

  return invite;
}
