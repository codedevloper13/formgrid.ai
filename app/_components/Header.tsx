"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 3L17 8L12 13L7 8L12 3Z" />
                  <path d="M17 8L21 12L17 16L13 12L17 8Z" />
                  <path d="M7 8L3 12L7 16L11 12L7 8Z" />
                  <path d="M12 13L17 18L12 21L7 18L12 13Z" />
                  <circle cx="12" cy="3" r="0.5" fill="white" />
                  <circle cx="17" cy="8" r="0.5" fill="white" />
                  <circle cx="7" cy="8" r="0.5" fill="white" />
                  <circle cx="12" cy="13" r="0.5" fill="white" />
                  <circle cx="12" cy="21" r="0.5" fill="white" />
                  <path d="M12 3v18" strokeDasharray="1 2" strokeWidth="1" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-semibold text-primary">
                Formgrid.ai
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link
                href="/about"
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        rootBox: "w-8 h-8",
                        avatarBox: "w-8 h-8 rounded-full",
                        userPreviewMainIdentifier: "font-medium text-gray-700",
                        userPreviewSecondaryIdentifier: "text-gray-500 text-sm",
                        userButtonPopoverCard:
                          "shadow-md rounded-md border border-gray-200",
                        userButtonPopoverActions: "p-0 m-0",
                        userButtonPopoverActionButton:
                          "text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 flex items-center gap-2",
                        userButtonPopoverFooter:
                          "p-4 bg-gray-50 text-center text-sm text-gray-500",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/sign-in"
                    className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/get-started"
                    className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="w-6 h-6 text-gray-600" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    Contact
                  </Link>
                  <div className="flex flex-col gap-4 pt-4 border-t">
                    {isSignedIn ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-center"
                        >
                          Dashboard
                        </Link>
                        <div className="flex justify-center">
                          <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                              elements: {
                                rootBox: "w-8 h-8",
                                avatarBox: "w-8 h-8 rounded-full",
                                userPreviewMainIdentifier:
                                  "font-medium text-gray-700",
                                userPreviewSecondaryIdentifier:
                                  "text-gray-500 text-sm",
                                userButtonPopoverCard:
                                  "shadow-md rounded-md border border-gray-200",
                                userButtonPopoverActions: "p-0 m-0",
                                userButtonPopoverActionButton:
                                  "text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 flex items-center gap-2",
                                userButtonPopoverFooter:
                                  "p-4 bg-gray-50 text-center text-sm text-gray-500",
                              },
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/sign-in"
                          className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium text-center"
                        >
                          Sign in
                        </Link>
                        <Link
                          href="/get-started"
                          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-center"
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
