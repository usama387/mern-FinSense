import React from "react";
import Navbar from "./reusable/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Route path="/" element={<Home />} />
                {/* <RedirectToSignIn /> */}
              </SignedOut>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
