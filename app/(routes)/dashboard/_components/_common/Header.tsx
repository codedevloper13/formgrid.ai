"use client";
import React, { useState } from "react";
import Logo from "@/components/logo/Logo";
import { getDashboardNavigation, userNavigation } from "@/utils/navigation";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { formId } = useParams();
  const dashboardNavigation = getDashboardNavigation(formId);
  const { user } = useKindeBrowserClient();

  const isGravatarFallback =
    user?.picture?.includes("gravatar.com/avatar") &&
    user?.picture?.includes("d=blank");
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 !bg-[#ffffff81] px-4 md:px-6 border-b border-gray-200">
      <nav className="hidden flex-col gap-6 h-full text-lg font-medium md:flex md:flex-row">
        <div className="flex items-center mr-2 pr-4 relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-[1px] after:bg-gray-200">
          <Logo />
        </div>
        <div className="flex items-center gap-6">
          {dashboardNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              } ${item.isDisabled ? "opacity-80 pointer-events-none" : ""}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-2 rounded-full bg-white/10 p-2 text-sm font-medium hover:bg-white/20"
        >
          <div className="flex flex-col">
            <span className="text-sm">
              {user?.given_name} {user?.family_name}
            </span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
          <Avatar className="h-8 w-8 bg-gray-200 shrink-0 rounded-full">
            {isGravatarFallback ? (
              <AvatarFallback className="text-xs font-medium">
                {user?.given_name?.charAt(0)?.toUpperCase() ?? ""}
                {user?.family_name?.charAt(0)?.toUpperCase() ?? ""}
              </AvatarFallback>
            ) : (
              <AvatarImage
                src={user?.picture || ""}
                alt={user?.given_name || "user"}
              />
            )}
          </Avatar>
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {userNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <LogoutLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Log out
            </LogoutLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
