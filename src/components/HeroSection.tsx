"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { auth, db } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { linkStyle, primaryStyle } from "../styles";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduce = useReducedMotion();
  const profileRef = useRef<HTMLDivElement>(null);

  // 🔥 Auth State
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔥 Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // 🔥 Google Login
  const handleGoogleLogin = async () => {
    if (!auth || !db) {
      alert("Firebase not configured. Check .env.local");
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;

      await setDoc(
        doc(db, "users", loggedUser.uid),
        {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
          createdAt: new Date(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setShowProfileMenu(false);
  };

  return (
    <header
      id="home"
      style={{
        background: "linear-gradient(90deg,#0b132b,#1f4068)",
        color: "#fff",
        paddingTop: "80px",
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: scrolled ? "10px 5%" : "14px 5%",
          transition: "all 0.35s ease",
          background: scrolled ? "rgba(11,19,43,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 6px 25px rgba(0,0,0,0.25)" : "none",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Image
            src="/images/logo.png"
            alt="Supekar Electronics"
            height={40}
            width={120}
            objectFit="contain"
          />
          <strong style={{ fontSize: "clamp(14px, 2.5vw, 20px)", whiteSpace: "nowrap" }}>Supekar Electronics</strong>
        </motion.div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "clamp(12px, 3vw, 20px)", alignItems: "center" }}>
          {["about", "products", "contact"].map((id, idx) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              whileHover={{ scale: 1.08 }}
              style={{
                ...linkStyle,
                position: "relative",
                overflow: "hidden",
                fontSize: "clamp(12px, 2vw, 16px)",
                padding: "8px 12px",
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
              <motion.div
                layoutId={`underline-${id}`}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 2,
                  width: "100%",
                  background: "#00d084",
                  transformOrigin: "left",
                  scaleX: 0,
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.button>
          ))}

          {/* AUTH SECTION */}
          {!user ? (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 20px rgba(0,208,132,0.35)" }}
              onClick={handleGoogleLogin}
              style={googleStyle}
            >
              Gmail Login
            </motion.button>
          ) : (
            <div ref={profileRef} style={{ position: "relative" }}>
              {/* Profile Picture */}
              <motion.img
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0px 0px 15px #00d084",
                  rotate: [0, 3, -3, 0],
                }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                src={user.photoURL}
                alt="profile"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "2px solid #00d084",
                }}
              />

              {/* Animated Logout Panel */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      top: 55,
                      right: 0,
                      background: "rgba(20,30,60,0.95)",
                      backdropFilter: "blur(14px)",
                      padding: "12px 20px",
                      borderRadius: 12,
                      boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleLogout}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      }}
                    >
                      Logout
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>

      {/* HERO CONTENT */}
      <section style={{ minHeight: "80vh", padding: "80px 5% 40px 5%" }}>
        <div className="hero-wrapper" style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 5vw, 40px)", flexDirection: "column" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
            style={{ maxWidth: "100%", width: "100%" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ fontSize: "clamp(1.5rem, 6vw, 3rem)", marginBottom: "clamp(12px, 3vw, 24px)", lineHeight: 1.3 }}
            >
              Smart, Repairable & Affordable Electronics — Made for India
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)", marginBottom: "clamp(16px, 4vw, 24px)", lineHeight: 1.6 }}
            >
              We design and manufacture reliable automation and IoT products
              focused on local serviceability and cost effectiveness.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ display: "flex", gap: "clamp(12px, 3vw, 16px)", justifyContent: "flex-start" }}
            >
              <motion.button
                onClick={() => scrollTo("products")}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,208,132,0.35)" }}
                style={{ ...primaryStyle, padding: "12px 24px", fontSize: "clamp(14px, 2.5vw, 16px)" }}
              >
                View Products
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px", width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Image
              src="/images/hero.png"
              alt="Product"
              width={500}
              height={500}
              style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
            />
          </motion.div>
        </div>
      </section>
    </header>
  );
}



const googleStyle: React.CSSProperties = {
  background: "#fff",
  border: "none",
  color: "#000",
  padding: "10px 20px",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
};