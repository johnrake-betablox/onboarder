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
              category: "Welcome",
              content: `Welcome to your Basecamp project and your first step in towards and \"new you\" on the internet! This is where we'll be working with you to prepare all the content your website needs.
              
But first, we need to lay down some ground rules and teach you a little bit about the process.
              
What you're reading right now is called a "task" in Basecamp. Basecamp tasks are essentially just a fancy todo list, much like a grocery list. This helps us organize information we will need from you.`,
            },
            {
              title: "How to get help",
              category: "Welcome",
              content: `It's very possible you get stuck on a task because it's not quite so simple to apply to your business. This is totally normal.
      
We know this process is brand new to you. Not too mention this might be your first time ever working with a company to build a website. That's a lot of "new" and we never want you to feel alone during this process.
              
So, when you have questions there are a few options to get help:
              
1. Add a comment and tag us. Basecamp has a way to tag/mention other people on the project, much like any social media platform. Here's how you can tag us for help.
2. Ping us. Alternatively, Basecamp also gives you the ability to ping our team members on your project. This works like a private message (or direct message if you prefer that term). Here's how to ping us for help.`,
            },
            {
              title: "Take the time you need",
              category: "Welcome",
              content: `We want to leave you with one final message before you head off...

**This process can goes as fast, or as slow as you want.**

Some people choose to cram it all out in a weekend. And others take 20 minutes bite-size chunks into the work over a month.

How you choose to work through the tasks are 100% up to you. We do not pressure you to complete this as fast as possible.

If you want to burst through - go for it. If you want to go slow, take a break for personal reasons, and come back when you can focus again - go for it.

This is a "go your own pace" sort of process.`,
            },
            {
              title: "What is your business name?",
              category: "Your Business",
              content: `Tell us your business name as you would to a customer (not your legal entity)`,
              form: {
                fields: [
                  {
                    type: "text",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What does your business do?",
              category: "Your Business",
              content: `What does your business do? (Keep this short, like a good elevator pitch)`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What are your business social media accounts?",
              category: "Your Business",
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
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What is your business physical address?",
              category: "Your Business",
              content: `What is your business physical address (ignore if not applicable)?`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What are your hours of operations?",
              category: "Your Business",
              content: `What are your hours of operation? (ignore if not applicable)`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "Does your business have a unique story?",
              category: "Your Business",
              content: `A good business start might be how you created the company, where the idea came from, the mission behind the company, or a unique customer experience.

This is primarily a place for you to tell your story to customers on the website. It's also a good way to separate yourself from the competition.`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "Who is your target customer?",
              category: "Your Business",
              content: `Who is your ideal audience/customer? Think about age, gender, personality, income, location, hobbies and interests, etc.`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What are the problems your customers face?",
              category: "Your Business",
              content: `What are the problems/frustrations your customers face?`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What is your competitive advantage?",
              category: "Your Business",
              content: `What makes you better/different from your competition? Another way to phrase this is "what makes you unique".`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What words would you use to describe your brand?",
              category: "Your Business",
              content: `What type of feeling, words, or message do you want your website to convey to customers?`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What are your brand colors?",
              category: "Your Business",
              content: `Brand colors are the specific colors that represent your business or brand identity. They play a crucial role in creating a consistent visual identity across various marketing materials and your website. It is important to provide your brand colors so that we can incorporate them into the design of your website, ensuring a cohesive and on-brand look and feel.
              
Let us know the main colors you use for your brand. If you have specific color codes or names, that's great! Otherwise, you can describe the colors or provide any visual references you have.`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What is your website domain?",
              category: "Your Website",
              content: `If you do not have a domain, what would you like it to be? We can help advise if needed.`,
              form: {
                fields: [
                  {
                    type: "text",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What are your goals for the website?",
              category: "Your Website",
              content: `Understanding your goals for the website is crucial in creating a tailored solution that aligns with your business objectives. By identifying your goals, we can strategically plan and design your website to achieve specific outcomes, such as increasing brand awareness, driving more sales or leads, enhancing user engagement, or improving overall user experience.

Provide us with a clear description of your goals for the website. Are you looking to generate more leads, sell products online, provide information to your audience, showcase your portfolio, or achieve any other specific objectives?
              `,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title:
                "What are websites we can use for design inspiration (competitors are ideal)?",
              category: "Your Website",
              content: `Design inspiration can often be found by looking at websites of your competitors or businesses in a similar industry. By examining the websites of your competitors, we can gain insights into the design choices they have made and identify opportunities to differentiate your own website while still meeting industry standards.

Provide us with the names or URLs of any competitor websites or other websites within your industry that you find inspiring or well-designed.
              `,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What pages will your website need?",
              category: "Your Website",
              content: `A website, like nearly everything else in business, will be better with a bit of planning. It can be tempting to jump into your content and design, but we advocate starting with a sitemap for your website. Your sitemap is a useful process for understanding what a pages a website needs and what role each page serves.

Ultimately, your sitemap will help you deliver a better user experience. Let's dive deeper and understand the purpose of sitemaps.

Take a minute to think about your website content. What pages will you website need? And on those pages, what content should will you want to show?

For example:

* Home: ... Give a brief description about the content you want to show on this page, or maybe your goal for the page...
* About: ...
* Services: ...
* etc...
              `,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What services do you offer?",
              category: "Your Website",
              content: `We aim to present your services in a way that captivates visitors and showcases the unique benefits and solutions you provide. We understand that every service you offer has its own set of distinctive features, pricing options, and value propositions.
              
What products or services do you sell to customers? Go into extensive detail as we will translate all your specifics on to your website. Be sure to list out service details as they apply:
* name
* description
* pricing
* warranties/guarantees
* discounts/promos
* features/details
* duration/availability
* maintenance/updates
* etc...`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title:
                "What are some of the benefits or perks for your customers?",
              category: "Your Website",
              content: `Listing the benefits of your products or services on your website is can engage potential customers and drive conversions. Highlighting the benefits helps customers understand how your offerings can improve their lives, solve their problems, or fulfill their desires.

What benefits does your service or product give clients? Try to get creative and think outside the box. What might customers not be considering that makes your service even better?

List out your benefits/perks with the following template:

* Benefit #1: A short explanation of the benefit. This will help people understand the value and connect better with it.
* Benefit #2: ... 
* Benefit #3: ...
* etc...
`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "Do you need to highlight your team on the website?",
              category: "Your Website",
              content: `Sometimes it's nice to show off your team, maybe with a nice picture and a short bio. This can be a great way to spice up your "about" page and add a bit more personality to the website.

If you have team members please list them out below. For each team member, use the following template:
`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What are some testimonials we can use?",
              category: "Your Website",
              content: `Displaying testimonials on your website is crucial for building trust, credibility, and social proof. Testimonials provide real-life experiences and feedback from satisfied customers, validating the quality and value of your products or services.

Take a few minutes and write down some testimonials we can use for your website. Add as many as you want, we can find ways to space them out throughout your website.
`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title: "What common questions do your customers have?",
              category: "Your Website",
              content: `Including a Frequently Asked Questions (FAQ) section on your website is a valuable strategy for addressing common concerns and providing clarity to your customers. FAQs offer a convenient way to proactively answer questions that potential customers may have.

Take some time to brainstorm some questions for your FAQ section of the website. **Be very thorough, your customers have many more questions than you think!** Feel free to go crazy. We can always create a dedicated page and the content is amazing for SEO!

Use the following template:

* Question #1?: The answer to your customer's question.
* Question #2?: The answer to your customer's question.
* Question #3?: The answer to your customer's question.
* Question #4?: The answer to your customer's question.
* etc...              
`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
                  },
                ],
              },
            },
            {
              title:
                "Do you have any impressive business stats we can highlight?",
              category: "Your Website",
              content: `Social proof refers to the concept that people tend to follow the actions and choices of others when making decisions. By showcasing testimonials, customer reviews, ratings, or success stories, you provide tangible evidence of the positive experiences and satisfaction of your previous customers. 

This social proof demonstrates that your products or services are reliable, effective, and trustworthy, making potential customers more likely to choose your business.                          

**Examples:**
* 1,700+ dogs groomed
* $100k saved for clients
* 100+ websites designed
* 1,000+ lives impacted
* 800 pounds of muscle gained
* 2mil+ impressions

Take some time and brainstorm some metrics around your business. Really get creative here. Literally anything you can quantify is fair game. What can you leverage to help new customers feel that you are trustworthy? 
`,
              form: {
                fields: [
                  {
                    type: "textarea",
                    name: "value",
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
