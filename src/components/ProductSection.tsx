"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  "Controls five electrical switches independently from one compact control unit",
  "Operated using IR remote and mobile app",
  "Fits inside existing switchboards without altering wiring",
  "Designed for safety and reliability",
  "Built to be repairable, reducing replacement costs and extending product lifespan",
];

export default function ProductSection() {
  return (
    <section
      id="products"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/product-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />

      {/* Cinematic Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.6) 100%)",
          zIndex: -1,
        }}
      />

      {/* Content Wrapper */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "120px", // 👈 Increased spacing
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 8%",
        }}
      >
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/s1-product.png"
            alt="Universal Switch Controller S1"
            width={480}
            height={480}
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
              boxShadow: "0 50px 100px rgba(0,0,0,0.7)",
            }}
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <div
          style={{
            flex: 1,
            maxWidth: "600px",
          }}
        >
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              fontSize: "48px",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Universal Switch Controller – S1
          </motion.h2>

          {/* Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "90px" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              height: "4px",
              background: "#00ff88",
              marginBottom: "30px",
              borderRadius: "2px",
            }}
          />

          {/* Feature List */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {features.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ x: 12 }}
                style={{
                  marginBottom: "20px",
                  fontSize: "18px",
                  color: "#ddd",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                ✅ {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}