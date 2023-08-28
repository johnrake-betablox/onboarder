import prisma from "@/lib/prisma";

export async function truncateDatabase() {
  const tableNames = ["User", "PasswordReset"];

  for (const tableName of tableNames) {
    await prisma.$queryRawUnsafe(
      `TRUNCATE "${tableName}" RESTART IDENTITY CASCADE;`
    );
  }

  await prisma.$disconnect();
}
