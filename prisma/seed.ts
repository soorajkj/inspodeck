import { prisma } from "@/lib/prisma";

const PAGES = [
  "Landing",
  "Pricing",
  "About",
  "Contact",
  "Blog",
  "Careers",
  "Login",
  "Sign Up",
  "Dashboard",
  "Product",
  "Features",
  "Case Study",
  "Documentation",
  "Changelog",
  "Waitlist",
  "404",
];

const CATEGORIES = [
  "Agency & Consulting",
  "AI",
  "Analytics",
  "API",
  "Application",
  "Architecture",
  "Art & Illustration",
  "B2B",
  "Banking",
  "Beauty & Cosmetics",
  "Branding",
  "Business & Corporate",
  "Community",
  "CRM",
  "Crypto",
  "Culture & Education",
  "Customer Support",
  "Design Tools",
  "Developer Tools",
  "E-commerce",
  "Education",
  "Environmental",
  "Event",
  "Fashion",
  "Film & TV",
  "FinTech",
  "Food & Drink",
  "Furniture",
  "Health",
  "Homeware",
  "Hospitality",
  "HR",
  "Insurance",
  "Luxury",
  "Magazine / Blog",
  "Marketing",
  "Marketplace",
  "Mobile Apps",
  "Music & Sound",
  "No-Code",
  "Photography",
  "Portfolio",
  "Production",
  "Productivity",
  "Real Estate",
  "SaaS",
  "SEO",
  "Social Media",
  "Software",
  "Sports",
  "Startup",
  "Technology",
  "Travel",
  "Web3",
];

const TECHNOLOGIES = [
  "React.js",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Svelte",
  "Astro",
  "WordPress",
  "Webflow",
  "Shopify",
  "Framer",
  "Tailwind CSS",
  "Bootstrap",
  "GSAP",
];

const FONTS = [
  "Inter",
  "Helvetica",
  "Arial",
  "Roboto",
  "SF Pro",
  "Poppins",
  "Montserrat",
  "Open Sans",
  "Lato",
  "Playfair Display",
  "DM Sans",
  "Space Grotesk",
  "Manrope",
  "Work Sans",
  "Figtree",
];

async function main() {
  await Promise.all(
    PAGES.map((name) =>
      prisma.page.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  await Promise.all(
    CATEGORIES.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  await Promise.all(
    TECHNOLOGIES.map((name) =>
      prisma.tech.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  await Promise.all(
    FONTS.map((name) =>
      prisma.font.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
