import slugify from "slugify";
import { prisma } from "@/lib/prisma";

// const PAGES = [
//   "Landing",
//   "Pricing",
//   "About",
//   "Contact",
//   "Blog",
//   "Careers",
//   "Login",
//   "Sign Up",
//   "Dashboard",
//   "Product",
//   "Features",
//   "Case Study",
//   "Documentation",
//   "Changelog",
//   "Waitlist",
//   "404",
// ];

const CATEGORIES = [
  "SaaS",
  "AI",
  "E-commerce",
  "FinTech",
  "Health & Wellness",
  "Education",
  "Real Estate",
  "Travel & Hospitality",
  "Food & Beverage",
  "Fashion & Lifestyle",
  "Media & Entertainment",
  "Gaming",
  "Web3 & Crypto",
  "Developer Tools",
  "Cloud & Infrastructure",
  "Data & Analytics",
  "Marketing",
  "Sales & CRM",
  "Productivity",
  "Collaboration",
  "HR & Recruiting",
  "Legal & Compliance",
  "Business & Consulting",
  "Agency",
  "Startup",
  "Portfolio",
  "Blog & Publishing",
];

async function main() {
  await prisma.category.createMany({
    data: CATEGORIES.map((name) => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    })),
    skipDuplicates: true,
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
