"use client";

import { useEffect, useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import Crest from "./Crest";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#projects", label: "Projects" },
  { href: "/#magazine", label: "Magazine" },
  { href: "/#batch-party", label: "Batch Party" },
  { href: "/#team", label: "Team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSignOutClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSignOut = () => {
    signOut();
    setShowConfirmModal(false);
    setOpen(false);
  };

  const handleCancelSignOut = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-elegant backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-narrow flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="ACOBA 2020 Group home"
        >
          <Crest
            size={44}
            className="transition-transform duration-300 group-hover:scale-105"
            ringClassName="bg-maroon text-gold"
            fallbackTextClassName="text-lg"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-bold text-maroon md:text-lg">
              ACOBA &lsquo;20
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-700">
              2020 Group
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-ink transition-colors duration-200 hover:text-maroon"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons for Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {!loading && user ? (
            <div className="flex items-center gap-4">
              {profile?.role === "admin" && (
                <Link
                  href="/admin"
                  className="mr-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold-700 hover:bg-gold/20 transition-all border border-gold/30"
                >
                  Admin Panel
                </Link>
              )}
              <span className="flex items-center gap-1.5 text-sm font-medium text-ink/80">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Hi, <strong className="text-maroon font-semibold">{profile?.full_name || user.email?.split("@")[0]}</strong>
              </span>
              <button
                onClick={handleSignOutClick}
                className="btn-outline flex items-center gap-2 !py-2 !px-5 !text-xs"
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-semibold text-ink hover:text-maroon transition-colors py-2 px-3"
              >
                Sign In
              </Link>
              <Link href="/signup" className="btn-primary !py-2.5 !px-6 !text-xs">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-maroon md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-white shadow-elegant transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <ul className="container-narrow flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="block rounded-md px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-maroon-50 hover:text-maroon"
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Auth links for Mobile */}
          {!loading && user ? (
            <>
              <div className="mt-2 border-t border-maroon-100 pt-2 px-3 py-2 text-xs text-ink/75">
                Logged in as: <strong className="text-maroon font-semibold">{profile?.full_name || user.email}</strong>
              </div>
              {profile?.role === "admin" && (
                <li>
                  <Link
                    href="/admin"
                    onClick={handleNavClick}
                    className="block rounded-md px-3 py-3 text-sm font-semibold text-gold-700 hover:bg-gold/5 transition-colors"
                  >
                    🛡️ Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleSignOutClick}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-maroon hover:bg-maroon-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mt-2 border-t border-maroon-100 pt-3">
                <Link
                  href="/signin"
                  onClick={handleNavClick}
                  className="flex w-full items-center justify-center rounded-md border border-maroon-200 px-3 py-2.5 text-center text-sm font-semibold text-maroon hover:bg-maroon-50 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li className="mt-1">
                <Link
                  href="/signup"
                  onClick={handleNavClick}
                  className="btn-primary w-full text-center py-2.5"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>

    {/* Custom Confirmation Modal */}
    {showConfirmModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-sm rounded-2xl border border-maroon-100 bg-white p-6 shadow-elegant-lg text-center">
          <h3 className="font-serif text-xl font-bold text-maroon">
            Confirm Sign Out
          </h3>
          <p className="mt-3 text-sm text-ink/75">
            Are you sure you want to sign out of your ACOBA 2020 account?
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleCancelSignOut}
              className="rounded-full border border-maroon/20 px-6 py-2 text-xs font-semibold text-ink/80 hover:bg-cream/40 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSignOut}
              className="rounded-full bg-maroon px-6 py-2 text-xs font-semibold text-white hover:bg-maroon-700 transition-colors shadow-elegant hover:shadow-elegant-lg active:scale-[0.98] transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}
