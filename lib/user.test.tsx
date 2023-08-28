/**
 * @jest-environment node
 */
import prisma from "@/lib/prisma";
import { createHarryPotterUser } from "@/fixtures/user";
import { truncateDatabase } from "@/test-utils/truncate-db";
import { validateAge, isMedicalCardHolder, updateProfile } from "./user";

beforeEach(async () => {
  await truncateDatabase();
});

afterAll(async () => {
  await truncateDatabase();
});

it("should verify user in database", async () => {
  await createHarryPotterUser();

  const users = await prisma.user.findMany();

  expect(users).toHaveLength(1);
  expect(users[0].firstName).toEqual("Harry");
  expect(users[0].lastName).toEqual("Potter");
  expect(users[0].email).toEqual("harry@hogwarts.io");
  expect(users[0].phone).toEqual("123-456-7890");
});
