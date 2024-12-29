interface NavItem {
  title: string;
  href: string;
  icon?: string;
  isDisabled?: boolean;
}

export const getDashboardNavigation = (formId: string | string[] | undefined): NavItem[] => [
  {
    title: "Dashboard",
    href: "/dashboard",
    isDisabled: false,
  },
  {
    title: "Builder",
    href: `/dashboard/form/builder/${formId}`,
    isDisabled: true,
  },
    {
    title: "Responds",
    href: `/dashboard/form/respond/`,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
];

export const userNavigation: NavItem[] = [
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
  // {
  //   title: "Sign out",
  //   href: "/auth/signout",
  // },
];
