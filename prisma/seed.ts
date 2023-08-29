import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async function main() {
  try {
    const agency = await prisma.agency.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        name: "BuildingBlox",
      },
    });

    const owner = await prisma.user.upsert({
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
        agencyId: agency.id,
        isOwner: true,
      },
    });

    const flow = await prisma.flow.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        Steps: {
          create: [
            {
              title: "👋 Welcome",
              content: `Welcome to your Basecamp project and your first step in towards and \"new you\" on the internet! This is where we'll be working with you to prepare all the content your website needs.
              
But first, we need to lay down some ground rules and teach you a little bit about the process.
              
What you're reading right now is called a "task" in Basecamp. Basecamp tasks are essentially just a fancy todo list, much like a grocery list. This helps us organize information we will need from you.`,
            },
            {
              title: "How to get help",
              content: `It's very possible you get stuck on a task because it's not quite so simple to apply to your business. This is totally normal.
      
We know this process is brand new to you. Not too mention this might be your first time ever working with a company to build a website. That's a lot of "new" and we never want you to feel alone during this process.
              
So, when you have questions there are a few options to get help:
              
1. Add a comment and tag us. Basecamp has a way to tag/mention other people on the project, much like any social media platform. Here's how you can tag us for help.
2. Ping us. Alternatively, Basecamp also gives you the ability to ping our team members on your project. This works like a private message (or direct message if you prefer that term). Here's how to ping us for help.`,
            },
            {
              title: "What is your business name?",
              content: `Tell us your business name as you would to a customer (not your legal entity)`,
              form: {
                fields: [
                  {
                    type: "text",
                    name: "name",
                  },
                ],
              },
            },
            {
              title: "What does your business do?",
              content: `What does your business do? (Keep this short, like a good elevator pitch)`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What are your business social media accounts?",
              content: `What are your business social media accounts (or other important links)?

Provide links to all your social platforms you want us to show on the website. For example:

* Facebook: https://www.facebook.com/my-company
* Instagram: https://www.instagram.com/my-company
* TikTok: https://www.tiktok.com/my-company
* etc...
              `,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What is your business physical address?",
              content: `What is your business physical address (ignore if not applicable)?`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What are your hours of operations?",
              content: `What are your hours of operation? (ignore if not applicable)`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "Does your business have a unique story?",
              content: `A good business start might be how you created the company, where the idea came from, the mission behind the company, or a unique customer experience.

This is primarily a place for you to tell your story to customers on the website. It's also a good way to separate yourself from the competition.`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "Who is your target customer?",
              content: `Who is your ideal audience/customer? Think about age, gender, personality, income, location, hobbies and interests, etc.`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What are the problems your customers face?",
              content: `What are the problems/frustrations your customers face?`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What is your competitive advantage?",
              content: `What makes you better/different from your competition? Another way to phrase this is "what makes you unique".`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What words would you use to describe your brand?",
              content: `What type of feeling, words, or message do you want your website to convey to customers?`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
            {
              title: "What are your brand colors?",
              content: `Brand colors are the specific colors that represent your business or brand identity. They play a crucial role in creating a consistent visual identity across various marketing materials and your website. It is important to provide your brand colors so that we can incorporate them into the design of your website, ensuring a cohesive and on-brand look and feel.
              
Let us know the main colors you use for your brand. If you have specific color codes or names, that's great! Otherwise, you can describe the colors or provide any visual references you have.`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "description",
                  },
                ],
              },
            },
          ],
        },
      },
    });

    const invite = await prisma.clientInvite.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        firstName: "Laura",
        lastName: "Panozzo",
        email: "laura.panozzo@marryment.com",
        phone: "+11231231234",
        token: "zFde9CuIOM2Ut1fKnf66a8QprrMG3yev",
        agencyId: agency.id,
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
