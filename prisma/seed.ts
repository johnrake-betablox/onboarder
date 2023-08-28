import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async function main() {
  try {
    // User
    const user = await prisma.user.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        firstName: "John",
        lastName: "Rake",
        email: "john@betablox.com",
        phone: "+16204730030",
        password:
          "$2b$10$Syg6seLr9g0SuSx.zeGGVeU4Jwn.xjnKbMON4HT0EvjCiD1lg.jo.", //password
        isAdmin: true,
      },
    });

    await prisma.step.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        title: "👋 Welcome",
        content: `Welcome to your Basecamp project and your first step in towards and \"new you\" on the internet! This is where we'll be working with you to prepare all the content your website needs.
## Heading 2
But first, we need to lay down some ground rules and teach you a little bit about the process.
### Heading 3
What you're reading right now is called a "task" in Basecamp. Basecamp tasks are essentially just a fancy todo list, much like a grocery list. This helps us organize information we will need from you.`,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
