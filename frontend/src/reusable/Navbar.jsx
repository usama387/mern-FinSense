import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Moon, Sun, Menu, X } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  
  // Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync dark mode with localStorage and apply to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full border-b bg-nav-bg/80 backdrop-blur-md border-nav-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">FinSense</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="nav" size="sm" className="text-sm px-3">
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="nav" size="sm" className="text-sm px-3">
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="nav" size="sm" className="text-sm px-3">
                Contact
              </Button>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-primary scale-90 sm:scale-100"
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Desktop Sign In/User Button */}
            <div className="hidden md:flex items-center">
              <SignedOut>
                <SignInButton>
                  <Button size="sm" className="relative group">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-sm">Sign In</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="p-0.5 sm:p-1 rounded-lg bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200",
                        userButtonBox: "flex items-center justify-center",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-2 bg-nav-bg/50 hover:bg-nav-bg/80 rounded-lg"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden border-t border-nav-border bg-nav-bg/90 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-3 pb-4 space-y-2 sm:px-6">
          <Link to="/" onClick={toggleMobileMenu}>
            <Button variant="nav" size="sm" className="w-full justify-start text-sm py-2">
              Home
            </Button>
          </Link>
          <Link to="/about" onClick={toggleMobileMenu}>
            <Button variant="nav" size="sm" className="w-full justify-start text-sm py-2">
              About
            </Button>
          </Link>
          <Link to="/contact" onClick={toggleMobileMenu}>
            <Button variant="nav" size="sm" className="w-full justify-start text-sm py-2">
              Contact
            </Button>
          </Link>
          <div className="pt-2 flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button
                  size="sm"
                  className="w-full justify-start relative group py-2"
                  onClick={toggleMobileMenu}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Sign In</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="p-1 rounded-lg bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 hover:scale-110 transition-transform duration-200",
                      userButtonBox: "flex items-center justify-start",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;