import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";
import Login from "./components/Login";
import MyContact from "./pages/MyContact";

import "./globals.css";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* 🔥 TOASTER — FORCE ON TOP */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 999999,
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          },
        }}
      />

      <LenisScroll />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/:id" element={<Generate />} />
        <Route path="/my-generations" element={<MyGeneration />} />
        <Route path="/preview" element={<YtPreview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-contact" element={<MyContact />} />
      </Routes>

      <Footer />
    </>
  );
}
