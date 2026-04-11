import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 py-24">
          <div className="col-span-12 lg:col-span-4">
            <div className="grid gap-4 lg:max-w-sm">
              <Link href="/" aria-label="Inspodeck">
                <svg
                  width={32}
                  height={32}
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-rose-500"
                >
                  <g clipPath="url(#clip0_1113_5188)">
                    <path
                      d="M199.686 0.31543C144.773 55.5693 144.877 144.877 200 200C144.877 144.877 55.5684 144.771 0.314453 199.685C55.2266 144.432 55.123 55.123 0 0C55.123 55.123 144.432 55.2295 199.686 0.31543Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1113_5188">
                      <rect width={200} height={200} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <div className="text-sm font-medium text-neutral-950">
                <p>Inspodeck</p>
                <p>Kochi, India</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <h3 className="mb-4 text-sm font-medium text-neutral-950">
                  Platform
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Websites
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Submit
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-medium text-neutral-950">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-medium text-neutral-950">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-medium text-neutral-950">
                  Community
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/"
                    >
                      Dribble
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid gap-6 pb-12">
          <div className="w-full max-w-3xl space-y-2">
            <p className="text-sm font-medium text-neutral-800">
              ©{new Date().getFullYear()} Inspodeck
            </p>
            <p className="text-sm font-medium text-neutral-800">
              Registered in India. All rights reserved.
            </p>
            <p className="text-xs leading-relaxed font-medium text-neutral-800">
              DISCLAIMER: The content on this website is provided for general
              informational purposes only and does not constitute professional
              advice. We make no representations or warranties regarding the
              accuracy, completeness, or reliability of the information
              provided. Any reliance you place on this information is strictly
              at your own risk.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
