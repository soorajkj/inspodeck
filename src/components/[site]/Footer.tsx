import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-100 bg-neutral-50">
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="grid grid-cols-12 gap-6 py-24">
          <div className="col-span-12 lg:col-span-4">
            <div className="grid gap-4 lg:max-w-sm">
              <Link
                href="/"
                aria-label="Inspodeck"
                className="inline-flex w-fit cursor-pointer items-center justify-center select-none"
              >
                <svg
                  width={36}
                  height={36}
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M41.176 24.088C41.176 14.6506 33.5254 7 24.088 7C14.6506 7 7 14.6506 7 24.088C7 33.5254 14.6506 41.176 24.088 41.176C33.5254 41.176 41.176 33.5254 41.176 24.088Z"
                    fill="#F54900"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.0001 48C30.967 47.9386 37.9334 46.4812 42.148 42.1478C46.4812 37.9334 47.9387 30.9668 48 24C47.9387 17.0334 46.4812 10.0666 42.148 5.85212C37.9334 1.51883 30.967 0.0614604 24.0001 0C17.0332 0.0614604 10.0666 1.51883 5.85214 5.85212C1.51883 10.0666 0.0614606 17.0334 0 24C0.0614606 30.9668 1.51883 37.9334 5.85214 42.1478C10.0666 46.4812 17.0334 47.9386 24.0001 48ZM23.2276 12C22.8559 18.0304 18.0305 22.8558 12 23.2274V24.7734C18.0302 25.145 22.8555 29.97 23.2276 36H24.7738C25.1457 29.9704 29.9705 25.1456 36.0001 24.7736V23.2274C29.9701 22.8552 25.1453 18.03 24.7736 12H23.2276Z"
                    fill="#F54900"
                  />
                  <mask
                    id="mask0_0_1"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x={14}
                    y={14}
                    width={20}
                    height={20}
                  >
                    <path d="M34 14H14V34H34V14Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_0_1)">
                    <path
                      d="M21.8995 17.6022C21.8995 15.6128 23.5122 14 25.5016 14C25.8836 14 26.1933 14.3096 26.1933 14.6916V30.3979C26.1933 32.3873 24.5805 34 22.5911 34C22.2091 34 21.8995 33.6904 21.8995 33.3084V17.6022Z"
                      fill="white"
                    />
                    <path
                      d="M28.0011 21.105C28.0011 19.1156 29.6139 17.5028 31.6034 17.5028C31.9854 17.5028 32.295 17.8125 32.295 18.1944V26.895C32.295 28.8844 30.6823 30.4971 28.6928 30.4971C28.3109 30.4971 28.0011 30.1875 28.0011 29.8055V21.105Z"
                      fill="white"
                    />
                    <path
                      d="M15.7978 21.105C15.7978 19.1156 17.4105 17.5028 19.4 17.5028C19.7819 17.5028 20.0916 17.8125 20.0916 18.1944V26.895C20.0916 28.8844 18.4788 30.4971 16.4894 30.4971C16.1074 30.4971 15.7978 30.1875 15.7978 29.8055V21.105Z"
                      fill="white"
                    />
                  </g>
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
                      href="/submissions"
                    >
                      Submit
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/legal/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-neutral-600 transition hover:underline"
                      href="/legal/terms-of-service"
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
                      href="/about"
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
      <div className="container mx-auto w-full px-4 md:px-6">
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
