export interface MenuItem {
  label: string;
  href: string;
}

export interface ActionButton {
  label: string;
  className?: string;
}
export const NAV_LINKS: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/posts/new", label: "New Post" },
];
