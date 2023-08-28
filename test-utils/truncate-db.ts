import prisma from "@/lib/prisma";

export async function truncateDatabase() {
  const tableNames = [
    "CartProduct",
    "Product",
    "Dispensary",
    "Cart",
    "Address",
    "User",
    "Order",
  ];

  for (const tableName of tableNames) {
    await prisma.$queryRawUnsafe(
      `TRUNCATE "${tableName}" RESTART IDENTITY CASCADE;`,
    );
  }

  await prisma.$disconnect();
}
