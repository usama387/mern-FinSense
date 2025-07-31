import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Moon, Sun } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd update the theme here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="w-full border-b bg-nav-bg/80 backdrop-blur-md border-nav-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FinSense</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="nav" size="sm">
                Home
              </Button>
            </Link>
            <Button variant="nav" size="sm">
              About
            </Button>
            <Button variant="nav" size="sm">
              Contact
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
            {/* Sign In Button */}
            <SignedOut>
              <SignInButton>
                <Button>
                  <div className="relative z-10 flex items-center gap-1 sm:gap-2">
                    <span>Sign In</span>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
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
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-nav-border bg-nav-bg/90">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button variant="nav" size="sm" className="w-full justify-start">
            Home
          </Button>
          <Button variant="nav" size="sm" className="w-full justify-start">
            About
          </Button>
          <Button variant="nav" size="sm" className="w-full justify-start">
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
