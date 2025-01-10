import { Loader2 } from "lucide-react";
import React from "react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

const Signin = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-8 items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-foreground"
                >
                  <path d="M3.8 3.8l16.4 16.4M20.2 3.8L3.8 20.2M15 3h6v6M9 21H3v-6" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Formgrid.ai
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Sign in to your Account
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Join us to start your journey
            </p>
          </div>
          <div className="mt-8">
            <ClerkLoaded>
              <SignIn
                path="/sign-in"
                appearance={{
                  elements: {
                    rootBox: {
                      boxShadow: "none",
                      width: "100%",
                    },
                    card: {
                      border: "none",
                      boxShadow: "none",
                      width: "100%",
                    },
                    formButtonPrimary: {
                      backgroundColor: "#4F46E5",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#4338CA",
                      },
                      "&:focus": {
                        backgroundColor: "#4338CA",
                        outline: "2px solid #818CF8",
                        outlineOffset: "2px",
                      },
                    },
                    socialButtonsBlockButton: {
                      border: "1px solid #E5E7EB",
                      "&:hover": {
                        backgroundColor: "#F9FAFB",
                      },
                    },
                    footerActionLink: {
                      color: "#4F46E5",
                      "&:hover": {
                        color: "#4338CA",
                      },
                    },
                  },
                }}
              />
            </ClerkLoaded>
            <ClerkLoading>
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin" size={40} color="#4F46E5" />
              </div>
            </ClerkLoading>
          </div>
        </div>
      </div>

      {/* Right side - Image/Background */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-4xl font-bold mb-6">Welcome to FormGrid.ai</h2>
          <p className="text-xl text-center max-w-md">
            Create, manage, and analyze forms with the power of AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
