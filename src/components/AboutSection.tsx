"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 🔥 Background Parallax Layer */}
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/about-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />

      {/* 🌑 Dark Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6))",
          zIndex: -1,
        }}
      />

      {/* ✨ Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "900px",
          padding: "70px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontSize: "48px",
            marginBottom: "30px",
            letterSpacing: "1px",
            fontWeight: "600",
          }}
        >
          About Us
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            fontSize: "19px",
            lineHeight: "1.9",
            color: "#ddd",
          }}
        >
          Supekar Electronics is a proposed electronics manufacturing venture
          focused on automation, IoT, and smart control solutions. The company
          is currently in the product development stage, with ready-to-launch
          designs aimed at affordable, repairable, and locally manufactured
          electronics. Our objective is to build a Made-in-India electronics
          brand with strong distributor and service support.
        </motion.p>
      </motion.div>
    </section>
  );
}