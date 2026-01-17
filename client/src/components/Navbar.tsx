import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 ONLY for My Contact
  const goToContact = () => {
    setIsOpen(false);

    if (location.pathname === "/") {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 70 }}
      >
        {/* LOGO → HOME */}
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-8.5 w-auto" />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {/* ✅ HOME: ONLY HOME */}
          <Link to="/" className="hover:text-pink-300 transition">
            Home
          </Link>

          <Link to="/generate" className="hover:text-pink-300 transition">
            Generate
          </Link>

          {isLoggedIn && (
            <Link to="/my-generations" className="hover:text-pink-300 transition">
              My Generations
            </Link>
          )}

          {/* ✅ MY CONTACT: SCROLL */}
          <button
            onClick={goToContact}
            className="hover:text-pink-300 transition"
          >
            My Contact
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="rounded-full size-8 bg-white/20 border-2 border-white/10">
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              <div className="absolute hidden group-hover:block top-6 right-0 pt-4">
                <button
                  onClick={logout}
                  className="bg-white/20 border-2 border-white/10 px-5 py-1.5 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 transition rounded-full"
            >
              Get Started
            </button>
          )}

          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <MenuIcon size={26} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur flex flex-col items-center justify-center gap-8 md:hidden transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ✅ HOME */}
        <Link onClick={() => setIsOpen(false)} to="/">
          Home
        </Link>

        <Link onClick={() => setIsOpen(false)} to="/generate">
          Generate
        </Link>

        {isLoggedIn && (
          <Link onClick={() => setIsOpen(false)} to="/my-generations">
            My Generations
          </Link>
        )}

        {/* ✅ MY CONTACT */}
        <button onClick={goToContact}>My Contact</button>

        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <Link onClick={() => setIsOpen(false)} to="/login">
            Login
          </Link>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="size-10 bg-pink-600 rounded-md flex items-center justify-center text-white"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
