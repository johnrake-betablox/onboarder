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

    const flow = await prisma.flow.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {},
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
        flowId: flow.id,
      },
    });
    await prisma.step.upsert({
      where: {
        id: 2,
      },
      update: {},
      create: {
        title: "How to get help",
        content: `It's very possible you get stuck on a task because it's not quite so simple to apply to your business. This is totally normal.

        We know this process is brand new to you. Not too mention this might be your first time ever working with a company to build a website. That's a lot of "new" and we never want you to feel alone during this process.
        
        So, when you have questions there are a few options to get help:
        
        1. Add a comment and tag us. Basecamp has a way to tag/mention other people on the project, much like any social media platform. Here's how you can tag us for help.
        2. Ping us. Alternatively, Basecamp also gives you the ability to ping our team members on your project. This works like a private message (or direct message if you prefer that term). Here's how to ping us for help.`,
        flowId: flow.id,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
