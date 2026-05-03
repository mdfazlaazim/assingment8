import Link from "next/link";

import { AuthArea } from "@/components/auth-area";

const links = [
  { href: "/", label: "Home" },
  { href: "/all-books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-200 bg-base-100/90 backdrop-blur">
      <nav className="page-wrap navbar px-0">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-black tracking-tight text-primary">
            BookNest
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          <AuthArea />
        </div>
      </nav>
    </header>
  );
}
