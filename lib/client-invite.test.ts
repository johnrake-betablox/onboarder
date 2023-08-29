/**
 * @jest-environment node
 */
import prisma from "@/lib/prisma";
import { truncateDatabase } from "@/test-utils/truncate-db";
import { sendClientInvite } from "./client-invite";
import { createAgency } from "@/fixtures/agency";
import { createFlow } from "@/fixtures/flow";

beforeEach(async () => {
  await truncateDatabase();
});

afterAll(async () => {
  await truncateDatabase();
});

it("should send a client invite", async () => {
  const agency = await createAgency();
  const flow = await createFlow(agency);

  const invite = await sendClientInvite(agency, flow, {
    email: "bob.smith@gmail.com",
    phone: "123-123-1234",
    firstName: "Bob",
    lastName: "Smith",
  });

  expect(invite).toEqual(
    expect.objectContaining({
      email: "bob.smith@gmail.com",
      phone: "123-123-1234",
      firstName: "Bob",
      lastName: "Smith",
      agencyId: agency.id,
      flowId: flow.id,
    }),
  );
});
