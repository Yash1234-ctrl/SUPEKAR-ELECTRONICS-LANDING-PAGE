"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="founder"
      className="bg-combined bg-pulse"
      style={{
        textAlign: "center",
        padding: "90px 5%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 1 }}
        viewport={{ once: true }}
      >
        {/* Founder Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          animate={
            shouldReduce
              ? undefined
              : { y: [0, -10, 0] }
          }
          transition={
            shouldReduce
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 30px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            border: "3px solid rgba(0,255,136,0.7)",
          }}
        >
          <Image
            src="/images/founder.jpg"
            alt="Founder"
            width={220}
            height={220}
            objectFit="cover"
          />
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: "44px",
            fontWeight: 600,
            letterSpacing: "1px",
            marginBottom: "10px",
          }}
        >
          Mr.Prathamesh Supekar
        </motion.h2>

        {/* Accent Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "90px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            height: "4px",
            background: "#00ff88",
            margin: "0 auto 20px",
            borderRadius: "2px",
          }}
        />

        {/* Role */}
        <motion.h3
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: "20px",
            color: "#ccc",
            marginBottom: "30px",
            fontWeight: 400,
          }}
        >
          Founder & CEO
        </motion.h3>

        {/* Vision Statement */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#ddd",
          }}
        >
          Our mission is to build reliable, repairable, and locally manufactured
          smart electronics that empower Indian households with accessible
          automation technology.
        </motion.p>
      </motion.div>
    </section>
  );
}